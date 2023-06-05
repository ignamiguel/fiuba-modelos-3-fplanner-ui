import { Button, Box, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PlanRequest, Degree} from '../genetic/model';
import { degreeList, mySubjectShift }from '../genetic/model'; 
import React from "react";


type Props = {
  request: PlanRequest;
  results: Array<any>[] | null;
  onGoBack: () => void;
}

const Results = ({results, request, onGoBack}:Props) => {

  const subjects = request.degreeIndex ? degreeList!.find((e: Degree) => e.id === request.degreeIndex).subjects : [];

  return (
  <>
  <Typography component="h2" variant='h4'>Resultados</Typography>
  <Card sx={{ maxWidth: 1000}}>
    
    <CardContent style={{ whiteSpace: "pre-line" }}>
      {`Carrera: ${request.degreeIndex? degreeList.find((e: Degree) => e.id === request.degreeIndex).name : ''}`}
      <br />
      {`Cantidad de Materias: ${request.degreeIndex ? degreeList.find((e: Degree) => e.id === request.degreeIndex).subjects.length : ''}`}
      <br />
      <List>
          {subjects.map((s, i) => (
            <ListItem key={i}>
              <ListItemIcon>
                📂
              </ListItemIcon>
              <ListItemText
                primary={s.name}
              />
            </ListItem>
          ))}
        </List>
      <br />
      {`Materias por cuatrimestre: ${request.numberOfSubjetsPerPeriod}`}
      <br />
      {`Disponibilidad para cursar: ${request.availiabilityForClasses ? mySubjectShift[request.availiabilityForClasses].name : ''}`}
      <br />
      {`Riesgo Aceptable: ${request.acceptableRisk} %`}
    </CardContent>
    
  </Card>
  <br />
  <Typography component="h4" variant='h5'>Plan Propuesto (generado GA)</Typography>
  <Typography component="h5" variant='h6'>Score {results[1]}</Typography>
  <Box sx={{ display: 'flex', flexDirection: "column", gap: "12px", maxWidth: 1000}}>
    {(
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Cuatrimestre</TableCell>
          <TableCell>Materias</TableCell>
          <TableCell>Probabilidad cuatrimestre</TableCell>
          <TableCell>Probabilidad</TableCell>
          <TableCell>Feedback</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results ? results[0].map((cuatrimestre, index) => (
           <TableRow
             key={index}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
             <TableCell scope="row">
               {`${index + 1}C`} 
             </TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>
                {cuatrimestre ? cuatrimestre.map((e, index) => (`${e.name}\n`)) : ''}
             </TableCell>
             <TableCell>{cuatrimestre ? (cuatrimestre.reduce((accumulator, currentValue) => accumulator * currentValue.probability, 1) * 100).toFixed(2) : '0'}%</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${e.probability}\n`)) : ''}</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${e.feedbackRating}\n`)) : ''}</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${(e.feedbackRating * e.probability).toFixed(2)}\n`)) : ''}</TableCell>
           </TableRow>
         )): ""}
      </TableBody>
    </Table>
  </TableContainer>)}
  </Box>
  <br />
  <Typography component="h4" variant='h5'>Mejor Plan</Typography>
  <Typography component="h5" variant='h6'>Score {results[3]}</Typography>
  <Box sx={{ display: 'flex', flexDirection: "column", gap: "12px", maxWidth: 1000}}>
    {(
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Cuatrimestre</TableCell>
          <TableCell>Materias</TableCell>
          <TableCell>Probabilidad cuatrimestre</TableCell>
          <TableCell>Probabilidad</TableCell>
          <TableCell>Feedback</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results ? results[2].map((cuatrimestre, index) => (
           <TableRow
             key={index}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
             <TableCell scope="row">
               {`${index + 1}C`} 
             </TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>
                {cuatrimestre ? cuatrimestre.map((e, index) => (`${e.name}\n`)) : ''}
             </TableCell>
             <TableCell>{cuatrimestre ? (cuatrimestre.reduce((accumulator, currentValue) => accumulator * currentValue.probability, 1) * 100).toFixed(2) : '0'}%</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${e.probability}\n`)) : ''}</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${e.feedbackRating}\n`)) : ''}</TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>{cuatrimestre ? cuatrimestre.map((e, index) => (`${(e.feedbackRating * e.probability).toFixed(2)}\n`)) : ''}</TableCell>
           </TableRow>
         )): ""}
      </TableBody>
    </Table>
  </TableContainer>)}
  </Box>
  <br />
  <Button variant="contained" type="button" onClick={onGoBack}>Retroceder</Button>
  </>
)};

export default Results;