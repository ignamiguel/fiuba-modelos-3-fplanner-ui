import GeneticAlgorithmConstructor from 'geneticalgorithm';
import { PlanRequest }  from "./model";
import { degrees } from './model';

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
  const dish = degrees[index];
  // const portionsByRestriction = getPortionsByRestrictions(request, phenotype);
  return {
    totalCost: acc.totalCost + dish.id * amount,
    totalPortions: acc.totalPortions + dish.id * amount,
    totalSatisfaction: acc.totalSatisfaction + dish.id * amount * dish.id,
    totalDishes: acc.totalDishes + amount,
    variety: acc.variety + (amount > 0 ? 1 : 0),
    restrictions: acc.restrictions
  };
}, {totalCost: 0, totalPortions: 0, totalSatisfaction: 0, totalDishes: 0, variety: 0, restrictions: getPortionsByRestrictions(request, phenotype)});


const satisfactionOrientedFitnessFunction = (request: PlanRequest) => (phenotype: any) => {
  const summary = getSummary(phenotype, request);
  // check if fits  restrictions
  if (!checkRestrictions(request, summary)) {
    return 0;
  }

	// use your phenotype data to figure out a fitness score
	return summary.totalSatisfaction / (summary.totalPortions ** 2);
}

const costOrientedFintessFunction = (request:PlanRequest) => (phenotype: any) => {
  const summary = getSummary(phenotype, request);
  // check if fits  restrictions
  if (!checkRestrictions(request, summary)) {
    return 0;
  }
  return request.degree - summary.totalCost;
}

const calculate = (request: PlanRequest): number[] | null => {
  // alert(JSON.stringify(request));
  return null;





  const firstPhenotype = new Array(degrees.length).fill(0);
  firstPhenotype[0] = request.degree

  const fitnessFunction = request.degree === 2 ? satisfactionOrientedFitnessFunction : costOrientedFintessFunction;
  const geneticAlgorithm = GeneticAlgorithmConstructor({
      mutationFunction: mutationFunction(request),
      crossoverFunction: crossoverFunctionIterate,
      fitnessFunction: fitnessFunction(request),
      population: [ firstPhenotype ]
  });

  for( let i = 0 ; i < 2000 ; i++ ) geneticAlgorithm.evolve()
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

function getPortionsByRestrictions(request: PlanRequest, phenotype: any) {
    return 1;
}

