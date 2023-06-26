import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { Degree, PlanRequest, Professorship, professorshipDic }  from "./model";
import { degreeList } from './model';

const NUMBER_OF_ITERATIONS = 2000;

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

  let score = 0;

  for (let i = 0; i < phenotype.length; i++) {
    const cuatrimestre = phenotype[i];

    if(!cuatrimestre) continue;
    
    for (let j = 0; j < cuatrimestre.length; j++) {
      const catedra = cuatrimestre[j];

      if (catedra) {
        score += catedra.probability * catedra.feedbackRating;
      }
    }
  }

  return score;
}

const calculate = (request: PlanRequest): Array<any> | null => {

  if(!isRequestValid(request)) {
    console.log("invalid request: ", JSON.stringify(request));
    return null;
  } else {
    console.log("Request: ", JSON.stringify(request));
  }

  const degree = degreeList.find((e: Degree) => e.id === request.degreeIndex);
  if (!degree) {
    console.log("degree is null: ", degree);
    return null;
  } else {
    console.log("degree selected: ", degree.name);
  }

  const numberOfSubjetsPerPeriod = request.numberOfSubjetsPerPeriod;

  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = degree.subjects.length;
  // TODO: ajustar cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const subjectArray = degree.subjects;

  // Algoritmo Greedy que crea 4 individuos
  const phenotypeArray = createPhenotypes(subjectArray, numberOfSubjetsPerPeriod);

  const phenotype1 = new Array(4);
  const phenotype2 = new Array(4);
  const phenotype3 = new Array(4);
  const phenotype4 = new Array(4);

  console.log("Pepe", JSON.stringify(phenotypeArray));

  // Individuo 1: obtiene la primera cátedra para la primera materia y la 2 cátedra para la segunda materia
  // Individuo 2: obtiene la segunda cátedra para la primera materia y la 1 cátedra para la segunda materia

  let i = 0;
  let j = 0;
  let k = 0;
  let l = 0;
  for (let index = 0; index < phenotype1.length; index++) {

    const cuatrimestre0 = new Array(numberOfSubjetsPerPeriod);

    const subjectArray_pepe = structuredClone(subjectArray);
    for (let index2 = 0; index2 < cuatrimestre0.length; index2++) {
      // cursada
      const materia = subjectArray_pepe.shift();
      if(!materia) {console.error("error cargado el phenotype con materia");}
      cuatrimestre0[index2] = professorshipDic[materia.id][0];
    }
    
    const cuatrimestre1 = new Array(2);
    const cuatrimestre2 = new Array(2);
    const cuatrimestre3 = new Array(2);
    const cuatrimestre4 = new Array(2);
    
    cuatrimestre1[0] = professorshipDic[subjectArray[i++].id][0];
    cuatrimestre1[1] = professorshipDic[subjectArray[i++].id][1];
    
    cuatrimestre2[0] = professorshipDic[subjectArray[j++].id][1];
    cuatrimestre2[1] = professorshipDic[subjectArray[j++].id][0];

    cuatrimestre3[0] = professorshipDic[subjectArray[k++].id][0];
    cuatrimestre3[1] = professorshipDic[subjectArray[k++].id][0];

    cuatrimestre4[0] = professorshipDic[subjectArray[l++].id][1];
    cuatrimestre4[1] = professorshipDic[subjectArray[l++].id][1];

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
    //population: [ phenotype1, phenotype2, phenotype3, phenotype4 ]
    population: phenotypeArray
  });

  for( let i = 0 ; i < NUMBER_OF_ITERATIONS ; i++ ) geneticAlgorithm.evolve();
  const best = geneticAlgorithm.best()

  console.log("BEST", best);

  return best;
};

function createPhenotypes(subjectArray, numberOfSubjetsPerPeriod): Array<any> {
  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = subjectArray.length;
  // TODO: ajustar cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const phenotype5 = new Array(periods);
  const phenotype6 = new Array(periods);
  const phenotype7 = new Array(periods);
  const phenotype8 = new Array(periods);

  
  const subjectArrayForWork = structuredClone(subjectArray);

  console.log("subjectArray", JSON.stringify(subjectArray));
  console.log("subjectArrayForWork", JSON.stringify(subjectArrayForWork));

  for (let cuatri_index = 0; cuatri_index < periods; cuatri_index++) {
    
    phenotype5[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype6[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype7[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype8[cuatri_index] = new Array(numberOfSubjetsPerPeriod);

    for (let cursada_index = 0; cursada_index < numberOfSubjetsPerPeriod; cursada_index++) {
      // cursada
      const materia = subjectArrayForWork.shift();
      if(!materia) {console.error("createPhenotypes --> error cargando el phenotype con materia");}
      
      phenotype5[cuatri_index][cursada_index] = professorshipDic[materia.id][0];
      phenotype6[cuatri_index][cursada_index] = professorshipDic[materia.id][1];
      phenotype7[cuatri_index][cursada_index] = professorshipDic[materia.id][cursada_index];
      phenotype8[cuatri_index][cursada_index] = professorshipDic[materia.id][1 - cursada_index];
    }
  }

  return [phenotype5, phenotype6, phenotype7, phenotype8];
}

function isRequestValid(request: PlanRequest):boolean {
  if(!request.degreeIndex) {
    console.log("request.degreeIndex is null: ", request.degreeIndex);
    return false;
  }

  if(!request.numberOfSubjetsPerPeriod) {
    console.log("request.numberOfSubjetsPerPeriod is invalid: ", request.numberOfSubjetsPerPeriod);
    return false;
  }
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
  
  const numberOfSubjetsPerPeriod = request.numberOfSubjetsPerPeriod;
  
  // TODO: ajustar cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const exactResultPlan = new Array(periods);

  const subjectArrayForWork = structuredClone(subjectArray);

  for (let i = 0; i < exactResultPlan.length; i++) {
    exactResultPlan[i] = new Array(numberOfSubjetsPerPeriod);

    for (let j = 0; j < numberOfSubjetsPerPeriod; j++) {
      const s = subjectArrayForWork.shift();

      const p1 = professorshipDic[s.id];

      // console.log("p1", JSON.stringify(p1));
    
      exactResultPlan[i][j] = getBetterProfessorshiOption(p1);
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