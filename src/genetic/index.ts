import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { Degree, PlanRequest, Professorship, professorshipDic }  from "./model";
import { degreeList } from './model';

const NUMBER_OF_ITERATIONS = 2000;
const OUT_OF_SHIFT_PENALTY = 10;
const NUMBER_OF_PROFESSORSHIPS = 2;

const myMutationFunction = (phenotype: Array<any>) => {
  const r1 = Math.random() * (phenotype.length - 0) + 0;
  const randomCuatrimestre = Math.floor(r1);

  const r2 = Math.random() * (phenotype[0].length - 0) + 0;
  const randomTurno = Math.floor(r2);

  const r3 = Math.random() * (NUMBER_OF_PROFESSORSHIPS - 0) + 0;
  const randomCatedra = Math.floor(r3);

  // use oldPhenotype and some random
  // function to make a change to your
  // phenotype

  const key = phenotype[randomCuatrimestre][randomTurno].subject;

  phenotype[randomCuatrimestre][randomTurno] = professorshipDic[key][randomCatedra];

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


const myFitnessFunction = (phenotype: Array<any>, shiftAvailability:number):number => {
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

      if(catedra.shift.id !== shiftAvailability) {
        score = score - OUT_OF_SHIFT_PENALTY;
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

  // 0, 1, 2, 4
  const shiftAvailability = request.availiabilityForClasses;

  const numberOfSubjetsPerPeriod = request.numberOfSubjetsPerPeriod;

  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre

  const subjectArray = degree.subjects;

  // Algoritmo Greedy que crea 4 individuos
  const phenotypeArray = createPhenotypes(subjectArray, numberOfSubjetsPerPeriod, shiftAvailability);

  console.log("phenotypeArray", JSON.stringify(phenotypeArray));

  // Individuo 1: obtiene la primera cátedra para la primera materia y la 2 cátedra para la segunda materia
  // Individuo 2: obtiene la segunda cátedra para la primera materia y la 1 cátedra para la segunda materia


  const geneticAlgorithm = GeneticAlgorithmConstructor({
    crossoverFunction: myCrossoverFunction,  
    mutationFunction: myMutationFunction,
    fitnessFunction: (phenotype: Array<any>) =>  myFitnessFunction(phenotype, shiftAvailability),
    //population: [ phenotype1, phenotype2, phenotype3, phenotype4 ]
    population: phenotypeArray
  });

  for( let i = 0 ; i < NUMBER_OF_ITERATIONS ; i++ ) geneticAlgorithm.evolve();
  const best = geneticAlgorithm.best()

  console.log("BEST", best);

  return best;
};

function createPhenotypes(subjectArray: Array<any>, numberOfSubjetsPerPeriod:number, shiftAvailability: number): Array<any> {
  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = subjectArray.length;
  // Cuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const phenotype5 = new Array(periods);
  const phenotype6 = new Array(periods);
  const phenotype7 = new Array(periods);
  const phenotype8 = new Array(periods);

  
  const subjectArrayForWork = structuredClone(subjectArray);

  // console.log("subjectArray", JSON.stringify(subjectArray));
  // console.log("subjectArrayForWork", JSON.stringify(subjectArrayForWork));

  for (let cuatri_index = 0; cuatri_index < periods; cuatri_index++) {
    
    phenotype5[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype6[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype7[cuatri_index] = new Array(numberOfSubjetsPerPeriod);
    phenotype8[cuatri_index] = new Array(numberOfSubjetsPerPeriod);

    for (let cursada_index = 0; cursada_index < numberOfSubjetsPerPeriod; cursada_index++) {
      // cursada
      const materia = subjectArrayForWork.shift();
      if(!materia) {console.error("createPhenotypes --> error cargando el phenotype con materia");}
      

      // ¿Cuándo puede cursar?
      // 0 - No seleccionó
      // 1 - Mañana
      // 2 - Tarde
      // 4 - Todos
      if(shiftAvailability === 0 || shiftAvailability === 4) {
        // Ignorar Turnos
        phenotype5[cuatri_index][cursada_index] = professorshipDic[materia.id][0];
        phenotype6[cuatri_index][cursada_index] = professorshipDic[materia.id][1];
        phenotype7[cuatri_index][cursada_index] = professorshipDic[materia.id][cursada_index];
        phenotype8[cuatri_index][cursada_index] = professorshipDic[materia.id][1 - cursada_index];
      } else {
        
        phenotype5[cuatri_index][cursada_index] = professorshipDic[materia.id][shiftAvailability - 1];
        phenotype6[cuatri_index][cursada_index] = professorshipDic[materia.id][shiftAvailability - 1];
        phenotype7[cuatri_index][cursada_index] = professorshipDic[materia.id][shiftAvailability - 1];
        phenotype8[cuatri_index][cursada_index] = professorshipDic[materia.id][shiftAvailability - 1];
      }
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
  
  // 0, 1, 2, 4
  const shiftAvailability = request.availiabilityForClasses;

  const subjectArray = degree.subjects;

  // Cantidad de cuatrimestres
  // # materias / # materias por cuatrimestre
  const numberOfSubjects = subjectArray.length;
  
  const numberOfSubjetsPerPeriod = request.numberOfSubjetsPerPeriod;
  
  // Ccuantas materias puedo hacer por cuatrimestre
  const periods = numberOfSubjects / numberOfSubjetsPerPeriod;

  const exactResultPlan = new Array(periods);

  const subjectArrayForWork = structuredClone(subjectArray);

  for (let i = 0; i < exactResultPlan.length; i++) {
    exactResultPlan[i] = new Array(numberOfSubjetsPerPeriod);

    for (let j = 0; j < numberOfSubjetsPerPeriod; j++) {
      const s = subjectArrayForWork.shift();

      const p1 = professorshipDic[s.id];
    
      exactResultPlan[i][j] = getBetterProfessorshiOption(p1, shiftAvailability);
    } 
  }
  return exactResultPlan;
} 

function getBetterProfessorshiOption(professorshipArray: Professorship[], shiftAvailability:number): Professorship {
  let betterP;
  let betterScore = 0;

  for (let index = 0; index < professorshipArray.length; index++) {
    const p = professorshipArray[index];
    
    // ¿Es necesario considerar los turnos?
    if(shiftAvailability === 1 || shiftAvailability === 2) {
      // ¿La cátedra se dicta en el turno seleccionado?
      if(p.shift.id === shiftAvailability) {
        const score = p.feedbackRating * p.probability;
        if(score > betterScore) {
          betterScore = score;
          betterP = p;
        }
      } else {
        continue;
      }
    } else {
      const score = p.feedbackRating * p.probability;
      if(score > betterScore) {
        betterScore = score;
        betterP = p;
      }
    }
  }

  return betterP;
}

export  {calculate, getSummary, calculateExact};