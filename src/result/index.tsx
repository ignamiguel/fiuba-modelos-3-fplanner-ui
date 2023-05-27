import { Button, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dishes, { MenuRequest } from '../genetic/model';


type Props = {
  request: MenuRequest;
  results: number[] | null;
  onGoBack: () => void;
}

const capitalize = (word:string) => word.charAt(0).toUpperCase() + word.slice(1);

const Results = ({results, request, onGoBack}:Props) => {
  const summary = {variety: 0, totalSatisfaction: 0, totalPortions: 0, totalCost: 0};
  const buyList:any = {"key": {"value": "value"}};
  return (
  <>
  <Typography component="h2" variant='h4'>Resultados</Typography>
  <Box sx={{ display: 'flex', flexDirection: "column", gap: "12px" }}>
    {results ? (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Nombre del plato</TableCell>
          <TableCell align="right">Cantidad</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map((result, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {dishes[index].name}
            </TableCell>
            <TableCell align="right">{result}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>) : "No result available :("}
    {/* {results ? results.map((result, index) => <Card key={index}><CardContent>{dishes[index].name}{": "}{result}</CardContent></Card>) : "No result available :("} */}
  </Box>
  {results && (
    <>
    <Typography component="h2" variant='h4'>Resumen</Typography>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Restriccion</TableCell>
        <TableCell>Pedida</TableCell>
        <TableCell>Obtenido</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell component="th" scope="row">Porciones</TableCell>
        <TableCell component="th" scope="row">{request.portions}</TableCell>
        <TableCell component="th" scope="row">{summary.totalPortions}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">Precio Maximo</TableCell>
        <TableCell component="th" scope="row">{request.budget}</TableCell>
        <TableCell component="th" scope="row">{summary.totalCost}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">Satisfaccion</TableCell>
        <TableCell component="th" scope="row">{request.satisfaction}</TableCell>
        <TableCell component="th" scope="row">{(summary.totalSatisfaction / summary.totalPortions).toFixed(0)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">Variedad</TableCell>
        <TableCell component="th" scope="row">{request.variety}</TableCell>
        <TableCell component="th" scope="row">{summary.variety}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
  
</TableContainer>
<Accordion>
        <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ingredientes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableCell>Ingrediente</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableHead>
              <TableBody>
                {Object.keys(buyList).map(key => (
                  <TableRow>
                    <TableCell>{capitalize(key)}</TableCell>
                    <TableCell>{buyList[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </AccordionDetails>
      </Accordion>
</>
  )}
  <Button variant="contained" type="button" onClick={onGoBack}>Retroceder</Button>
  </>
)};

export default Results;