import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { Degree, PlanRequest, Professorship, professorshipDic }  from "./model";
import { degreeList } from './model';

const myMutationFunction = (phenotype: Array<any>) => {
  const r1 = Math.random() * (phenotype.length - 0) + 0;
  const randomPeriod = Math.floor(r1);

  const r2 = Math.random() * (phenotype[0].length - 0) + 0;
  const randomTurno = Math.floor(r2);

  const r3 = Math.random() * (2 - 0) + 0;
  const randomCatedra = Math.floor(r3);

  // use oldPhenotype and some random
  // function to make a change to your
  // phenotype

  const key = phenotype[randomPeriod][randomTurno].subject;

  phenotype[randomPeriod][randomTurno] = professorshipDic[key][randomCatedra];

	return phenotype;
};

function myCrossoverFunction(phenotypeA: any, phenotypeB: any) {

  // TODO: revisar que estén todas las materias que tiene que estar

  // Create two new phenotypes by using the first half of A and the second half of B
  const half = Math.floor(phenotypeA.length / 2)
  const newPhenotypeA = phenotypeA.slice(0, half).concat(phenotypeB.slice(half))
  const newPhenotypeB = phenotypeB.slice(0, half).concat(phenotypeA.slice(half))

	return [ newPhenotypeA , newPhenotypeB ]
}

const getSummary = (phenotype:any, request:PlanRequest) => phenotype.reduce((acc: any, amount: number, index: any) => {
  const dish = degreeList[index];
  
  return {
    totalCost: acc.totalCost + dish.id * amount,
    totalPortions: acc.totalPortions + dish.id * amount,
    totalSatisfaction: acc.totalSatisfaction + dish.id * amount * dish.id,
    totalDishes: acc.totalDishes + amount,
    variety: acc.variety + (amount > 0 ? 1 : 0),
    restrictions: acc.restrictions
  };
});


const myFitnessFunction = (phenotype: Array<any>):number => {
  // use phenotype and possibly some other information
  // to determine the fitness number.  Higher is better, lower is worse.

  let probability = 1;
  let rating = 0;
  for (let i = 0; i < phenotype.length; i++) {
    const cuatrimestre = phenotype[i];

    if(!cuatrimestre) continue;
    
    for (let j = 0; j < cuatrimestre.length; j++) {
      const turno = cuatrimestre[j];
      
      if (turno) {
        probability = probability * turno.probability;
        rating = rating + turno.feedbackRating;
      }
    }
  }

  
  return probability * (1 + rating);
}

const calculate = (request: PlanRequest): Array<any> | null => {

  if(!isRequestValid(request)) {
    console.log("invalid request: ", JSON.stringify(request));
    return null;
  }

  const degree = degreeList.find((e: Degree) => e.id === request.degreeIndex);
  if (!degree) {
    console.log("degree is null: ", degree);
    return null;
  }

  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = degree.subjects.length;
  // TODO: ajustar cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / /*request.numberOfSubjetsPerPeriod*/ 2;

  const subjects = degree.subjects;

  // Algoritmo Greedy que crea 4 individuos
  const phenotype1 = new Array(periods);
  const phenotype2 = new Array(periods);
  const phenotype3 = new Array(periods);
  const phenotype4 = new Array(periods);

  // Individuo 1: obtiene la primera cátedra para la primera materia y la 2 cátedra para la segunda materia
  // Individuo 2: obtiene la segunda cátedra para la primera materia y la 1 cátedra para la segunda materia


  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  for (let index = 0; index < phenotype1.length; index++) {
    const cuatrimestre1 = new Array(2);
    const cuatrimestre2 = new Array(2);
    const cuatrimestre3 = new Array(2);
    const cuatrimestre4 = new Array(2);
    
    cuatrimestre1[0] = professorshipDic[subjects[i++].id][0];
    cuatrimestre1[1] = professorshipDic[subjects[i++].id][1];
    
    cuatrimestre2[0] = professorshipDic[subjects[j++].id][1];
    cuatrimestre2[1] = professorshipDic[subjects[j++].id][0];

    cuatrimestre3[0] = professorshipDic[subjects[k++].id][0];
    cuatrimestre3[1] = professorshipDic[subjects[k++].id][0];

    cuatrimestre4[0] = professorshipDic[subjects[l++].id][1];
    cuatrimestre4[1] = professorshipDic[subjects[l++].id][1];

    // TODO: Saco el turno noche
    // cuatrimestre[2] = `Turno Noche`;

    phenotype1[index] = cuatrimestre1;
    phenotype2[index] = cuatrimestre2;
    phenotype3[index] = cuatrimestre3;
    phenotype4[index] = cuatrimestre4;
  }

  const geneticAlgorithm = GeneticAlgorithmConstructor({
    crossoverFunction: myCrossoverFunction,  
    mutationFunction: myMutationFunction,
    fitnessFunction: myFitnessFunction,
    population: [ phenotype1, phenotype2, phenotype3, phenotype4 ]
  });

  for( let i = 0 ; i < 2000 ; i++ ) geneticAlgorithm.evolve();
  const best = geneticAlgorithm.best()

  console.log("BEST", best);

  return best;
}

function isRequestValid(request: PlanRequest):boolean {
  if(!request.degreeIndex) {
    console.log("request.degreeIndex is null: ", request.degreeIndex);
    return false;
  }

  // if(!request.numberOfSubjetsPerPeriod) {
  //   console.log("request.numberOfSubjetsPerPeriod is invalid: ", request.numberOfSubjetsPerPeriod);
  //   return false;
  // }
  return true;
}

function calculateExact(request: PlanRequest): Array<any> | null {
  if(!isRequestValid(request)) {
    console.log("invalid request: ", JSON.stringify(request));
    return null;
  }

  const degree = degreeList.find((e: Degree) => e.id === request.degreeIndex);
  if (!degree) {
    console.log("degree is null: ", degree);
    return null;
  }
  
  const subjectArray = degree.subjects;

  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = subjectArray.length;
  const numberOfSubjetsPerPeriod = /*request.numberOfSubjetsPerPeriod*/ 2;
  // TODO: ajustar cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const exactResultPlan = new Array(periods);

  let k = 0;

  for (let i = 0; i < exactResultPlan.length; i++) {
    exactResultPlan[i] = new Array(numberOfSubjetsPerPeriod);

    for (let j = 0; j < numberOfSubjetsPerPeriod; j++) {
      const s = subjectArray[k];
      
      // console.log("s", JSON.stringify(s));

      const p1 = professorshipDic[s.id];

      // console.log("p1", JSON.stringify(p1));
    
      exactResultPlan[i][j] = getBetterProfessorshiOption(p1);
      k++;
    } 
  }
  return exactResultPlan;
} 

function getBetterProfessorshiOption(professorshipArray: Professorship[]): Professorship {
  let betterP;
  let betterScore = 0;

  for (let index = 0; index < professorshipArray.length; index++) {
    const p = professorshipArray[index];
    const score = p.feedbackRating * p.probability;
    if(score > betterScore) {
      betterScore = score;
      betterP = p;
    }
  }

  return betterP;
}

export  {calculate, getSummary, calculateExact};