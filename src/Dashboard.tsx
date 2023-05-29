import { Card, 
  CardContent, 
  CardHeader,
 } from "@mui/material";

import Form from './form';
import { useState } from "react";
import type {PlanRequest} from "./genetic/model";
import Results from "./result";
import { calculate } from "./genetic";
import React from "react";


type Views = "restrictions" | "results";
export const Dashboard = () => {

  const [results, setResult] = useState<Array<any> | null>(null);
  const [view, setView] = useState<Views>("restrictions");
  const [request, setRequest] = useState<PlanRequest>({degree: 0, numberOfSubjetsPerPeriod: 0, availiabilityForClasses: 0, acceptableRisk: 0});
  
  const doCalculations = (request: any) => {
    setRequest(request)
    const result = calculate(request);
    setResult(result);
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

