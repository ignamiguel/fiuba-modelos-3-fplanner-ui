import { Card, 
  CardContent, 
  CardHeader,
 } from "@mui/material";

import Form from './form';
import { useState } from "react";
import type {MenuRequest} from "./genetic/model";
import Results from "./result";


type Views = "restrictions" | "results";
export const Dashboard = () => {

  const [results, setResult] = useState<number[] | null>(null);
  const [view, setView] = useState<Views>("restrictions");
  const [request, setRequest] = useState<MenuRequest>({portions: 0, budget: 0, satisfaction: 0, variety: 0, optimize: "satisfaction"});
  const doCalculations = (request: any) => {
    setRequest(request)
    const result = calculate(request);
    setResult(result);
    setView("results");
  }

  return (
    <Card>
    <CardHeader title="Planificar de Carreras FIUBA Planner" />
    <CardContent>Seleccionar una carrera para calcular un plan</CardContent>
    <CardContent>
          {view === "restrictions" && <Form doCalculations={doCalculations} />}
          {view === "results" && <Results results={results} onGoBack={() => setView("restrictions")} request={request}/>}
      {/* <Form doCalculations={doCalculations} /> */}
    </CardContent>
  </Card>
  )
};

function calculate(request: any):any {
  alert("calculate");
  return 0;
}

