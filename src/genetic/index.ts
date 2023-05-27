import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { Degree, PlanRequest }  from "./model";
import { degreeList } from './model';

// Mutation Function
const mutationFunction = (request:PlanRequest) => (phenotype: any) => {
  const randomCromosome = Math.floor(Math.random() * phenotype.length);
  const modifierRand = Math.random();
  const maxChange = Math.ceil(request.acceptableRisk / 10);

  // Generate a random change value between -maxChange and +maxChange
  const randomChange = Math.round((modifierRand - 0.5) * 2 * maxChange);

  const phenotypeCopy = [...phenotype];
  phenotypeCopy[randomCromosome] += randomChange;

  // Ensure the mutated value is within the valid range [0, request.portions]
  phenotypeCopy[randomCromosome] = Math.max(0, Math.min(request.acceptableRisk, phenotypeCopy[randomCromosome]));

  return phenotypeCopy;
};

function crossoverFunction(phenotypeA: any, phenotypeB: any) {
  // Create two new phenotypes by using the first half of A and the second half of B
  const half = Math.floor(phenotypeA.length / 2)
  const newPhenotypeA = phenotypeA.slice(0, half).concat(phenotypeB.slice(half))
  const newPhenotypeB = phenotypeB.slice(0, half).concat(phenotypeA.slice(half))

	return [ newPhenotypeA , newPhenotypeB ]
}

function crossoverFunctionIterate(phenotypeA: any, phenotypeB: any) {
  const length = Math.min(phenotypeA.length, phenotypeB.length);
  const newPhenotypeA: typeof phenotypeA = [];
  const newPhenotypeB: typeof phenotypeB = [];

  for (let i = 0; i < length; i++) {
    newPhenotypeA.push(phenotypeA[i]);
    newPhenotypeB.push(phenotypeB[i]);
  }

  return [newPhenotypeA, newPhenotypeB];
}

const getSummary = (phenotype:any, request:PlanRequest) => phenotype.reduce((acc: any, amount: number, index: any) => {
  const dish = degreeList[index];
  // const portionsByRestriction = getPortionsByRestrictions(request, phenotype);
  return {
    totalCost: acc.totalCost + dish.id * amount,
    totalPortions: acc.totalPortions + dish.id * amount,
    totalSatisfaction: acc.totalSatisfaction + dish.id * amount * dish.id,
    totalDishes: acc.totalDishes + amount,
    variety: acc.variety + (amount > 0 ? 1 : 0),
    restrictions: acc.restrictions
  };
});


const satisfactionOrientedFitnessFunction = (request: PlanRequest) => (phenotype: any) => {
  const summary = getSummary(phenotype, request);
  // check if fits  restrictions
  if (!checkRestrictions(request, summary)) {
    return 0;
  }

	// use your phenotype data to figure out a fitness score
	return summary.totalSatisfaction / (summary.totalPortions ** 2);
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
  const periods = numberOfSubjects / /*request.numberOfSubjetsPerPeriod*/ 2;

  const subjects = degree.subjects;

  console.log("periods", periods);
  
  // TODO: Saco el turno tarde
  const firstPhenotype = new Array(periods);

  console.log("BEFORE firstPhenotype", JSON.stringify(firstPhenotype));

  // Algritmo Greedy que obtiene la primera cátedra de cada materia
  let i = 0;
  for (let index = 0; index < firstPhenotype.length; index++) {
    console.log(index);

    const cuatrimestre = new Array(2);
    cuatrimestre[0] = subjects[i++].profesorships[0];
    cuatrimestre[1] = subjects[i++].profesorships[0];
    // cuatrimestre[2] = `Turno Noche`;

    firstPhenotype[index] = cuatrimestre;
  }

  console.log("AFTER firstPhenotype", JSON.stringify(firstPhenotype));
  return firstPhenotype;

  //console.log("subjects", JSON.stringify(firstPhenotype));
  
  firstPhenotype[0] = subjects[0].profesorships[0];
  
  const geneticAlgorithm = GeneticAlgorithmConstructor({
      mutationFunction: mutationFunction(request),
      crossoverFunction: crossoverFunctionIterate,
      fitnessFunction: satisfactionOrientedFitnessFunction(request),
      population: [ firstPhenotype ]
  });

  for( let i = 0 ; i < 2000 ; i++ ) geneticAlgorithm.evolve();
  const best = geneticAlgorithm.best()

  console.log(request, best)
  if (checkRestrictions(request, getSummary(best, request))) {
    return best;
  }
  return null;
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

  if(!request.numberOfSubjetsPerPeriod) {
    console.log("request.numberOfSubjetsPerPeriod is invalid: ", request.numberOfSubjetsPerPeriod);
    return false;
  }
  return true;
}

