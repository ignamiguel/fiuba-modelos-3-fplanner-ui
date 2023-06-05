import { Card, 
  CardContent, 
  CardHeader,
 } from "@mui/material";

import Form from './form';
import { useState } from "react";
import type {PlanRequest, Professorship} from "./genetic/model";
import Results from "./result";
import { calculate, calculateExact } from "./genetic";
import React from "react";


type Views = "restrictions" | "results";
export const Dashboard = () => {

  const [results, setResults] = useState<Array<any> | null>(null);
  const [view, setView] = useState<Views>("restrictions");
  const [request, setRequest] = useState<PlanRequest>({degreeIndex: 0, numberOfSubjetsPerPeriod: 0, availiabilityForClasses: 0, acceptableRisk: 0});
  
  const doCalculations = (request: any) => {
    setRequest(request)
    const result = calculate(request);
    const exactResult: Array<Array<Professorship>> = calculateExact(request);
    console.log("exactResult", exactResult);

    let score = 0;
    for (let i = 0; i < result.length; i++) {
      const cuatrimestre = result[i];
      for (let j = 0; j < cuatrimestre.length; j++) {
        const catedra = cuatrimestre[j];
        score += (catedra.feedbackRating * catedra.probability);
      }
    }

    console.log("score", score.toFixed(2));

    let exactScore = 0;
    
    for (let i = 0; i < exactResult.length; i++) {
      const cuatrimestre = exactResult[i];
      for (let j = 0; j < cuatrimestre.length; j++) {
        const catedra = cuatrimestre[j];
        exactScore += (catedra.feedbackRating * catedra.probability);
      }
    }

    console.log("exactScore", exactScore.toFixed(2));

    const myResults = new Array(4);
    myResults[0] = result;
    myResults[1] = score.toFixed(2);
    myResults[2] = exactResult;
    myResults[3] = exactScore.toFixed(2);
    setResults(myResults);
    setView("results");
  }

  return (
    <Card>
    <CardHeader title="Planificador de Carreras FIUBA Planner" />
    <CardContent>
          {view === "restrictions" && <Form doCalculations={doCalculations} />}
          {view === "results" && <Results results={results} onGoBack={() => setView("restrictions")} request={request}/>}
    </CardContent>
  </Card>
  )
};

