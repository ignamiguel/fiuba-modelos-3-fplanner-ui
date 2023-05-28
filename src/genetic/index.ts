import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { Degree, PlanRequest, Professorship }  from "./model";
import { degreeList } from './model';

const myMutationFunction = (phenotype: Array<any>) => {
  const r1 = Math.random() * (phenotype.length - 0) + 0;
  const randomPeriod = Math.floor(r1);

  const r2 = Math.random() * (phenotype[0].length - 0) + 0;
  const randomTurno = Math.floor(r1);

  // use oldPhenotype and some random
  // function to make a change to your
  // phenotype
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
  return probability * rating;
}

const calculate = (request: PlanRequest): Array<any> | null => {

  if(!isRequestValid(request)) {
    console.log("invalid request: ", JSON.stringify(request));
    return null;
  }

  const degree = degreeList.find((e: Degree) => e.id === request.degree);
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
  
  const firstPhenotype = new Array(periods);

  // Algritmo Greedy que obtiene la primera cátedra de cada materia
  let i = 0;
  for (let index = 0; index < firstPhenotype.length; index++) {
    const cuatrimestre = new Array(2);
    cuatrimestre[0] = subjects[i++].profesorships[0];
    cuatrimestre[1] = subjects[i++].profesorships[0];
    // TODO: Saco el turno noche
    // cuatrimestre[2] = `Turno Noche`;

    firstPhenotype[index] = cuatrimestre;
  }

  // console.log("myFitnessFunction", myFitnessFunction(firstPhenotype));

  // const [A, B] = myCrossoverFunction(firstPhenotype, firstPhenotype);

  // console.log("myCrossoverFunction", JSON.stringify(A));

  // myMutationFunction(firstPhenotype);

  
  
  const geneticAlgorithm = GeneticAlgorithmConstructor({
    crossoverFunction: myCrossoverFunction,  
    mutationFunction: myMutationFunction,
    fitnessFunction: myFitnessFunction,
    population: [ firstPhenotype ]
  });

  for( let i = 0 ; i < 2000 ; i++ ) geneticAlgorithm.evolve();
  const best = geneticAlgorithm.best()

  console.log("BEST", best);

  return firstPhenotype;

  // console.log(request, best)
  // if (checkRestrictions(request, getSummary(best, request))) {
  //   return best;
  // }
  // return null;
}

export  {calculate, getSummary};
    function checkRestrictions(request: any, summary: any) {
        return true;
    }

function isRequestValid(request: PlanRequest):boolean {
  if(!request.degree) {
    console.log("request.degree is null: ", request.degree);
    return false;
  }

  // if(!request.numberOfSubjetsPerPeriod) {
  //   console.log("request.numberOfSubjetsPerPeriod is invalid: ", request.numberOfSubjetsPerPeriod);
  //   return false;
  // }
  return true;
}