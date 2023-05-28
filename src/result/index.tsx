import { Button, Box, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Icon } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PlanRequest, Degree} from '../genetic/model';
import { degreeList, mySubjectShift }from '../genetic/model'; 


type Props = {
  request: PlanRequest;
  results: Array<any>[] | null;
  onGoBack: () => void;
}

const Results = ({results, request, onGoBack}:Props) => {

  console.log("RESULTX", JSON.stringify(results));

  const subjects = request.degree ? degreeList.find((e: Degree) => e.id === request.degree).subjects : [];


  return (
  <>
  <Typography component="h2" variant='h4'>Resultados</Typography>
  <Card sx={{ maxWidth: 1000}}>
    
    <CardContent style={{ whiteSpace: "pre-line" }}>
      {`Carrera: ${request.degree? degreeList.find((e: Degree) => e.id === request.degree).name : ''}`}
      <br />
      {`Cantidad de Materias: ${request.degree ? degreeList.find((e: Degree) => e.id === request.degree).subjects.length : ''}`}
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
  <Box sx={{ display: 'flex', flexDirection: "column", gap: "12px", maxWidth: 1000}}>
    {(
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Cuatrimestre</TableCell>
          <TableCell>Materias</TableCell>
          <TableCell>Probabilidad de Aprobar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results ? results.map((cuatrimestre, index) => (
           <TableRow
             key={index}
             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
             <TableCell scope="row">
               {`${index + 1}C`} 
             </TableCell>
             <TableCell style={{ whiteSpace: "pre-line" }}>
              {
              cuatrimestre.map((e, index) => (`${e.name}
             `))}
             </TableCell>
             <TableCell>90%</TableCell>
           </TableRow>
         )): ""}
        {/* <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>1C</TableCell>
          <TableCell>Álgebra<br />Análisis Matemático</TableCell>
          <TableCell>90%</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>2C</TableCell>
          <TableCell>Organización del Computador<br />Modelos y Optimización I</TableCell>
          <TableCell>90%</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>3C</TableCell>
          <TableCell>Algoritmos y Programación I<br />Base de Datos</TableCell>
          <TableCell>90%</TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>4C</TableCell>
          <TableCell>Técnicas de Diseño<br />Administración de Proyectos</TableCell>
          <TableCell>90%</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  </TableContainer>)}
    {/* {results ? results.map((result, index) => <Card key={index}><CardContent>{dishes[index].name}{": "}{result}</CardContent></Card>) : "No result available :("} */}
  </Box>
  <br />
  <Button variant="contained" type="button" onClick={onGoBack}>Retroceder</Button>
  </>
)};

export default Results;