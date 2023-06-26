import { Box,Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"

import { useState } from "react";

const Form = ({doCalculations}: {doCalculations:any}) => {
  const [degreeIndex, setDegree] = useState(0);
  const [numberOfSubjetsPerPeriod, setNumberOfSubjetsPerPeriod] = useState(0);
  const [availiabilityForClasses, setAvailiabilityForClasses] = useState(0);
  const [acceptableRisk, setAcceptableRisk] = useState(0);

  const handleCalculate = () => {
    doCalculations({degreeIndex, numberOfSubjetsPerPeriod, availiabilityForClasses, acceptableRisk});
  }

  return (
    <>
    <Typography component="h5" variant='h4'>Restricciones</Typography>
    <Typography>Seleccionar una carrera para calcular un plan</Typography>
    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Carreras</InputLabel>
        <Select
          value={degreeIndex}
          label="Carreras"
          onChange={(e) => setDegree(Number(e.target.value))}
        >
          <MenuItem value={0}>Seleccionar</MenuItem>
          <MenuItem value={1}>Ingeniería Informática</MenuItem>
          <MenuItem value={2}>Lic. en Análisis de Sistemas</MenuItem>
          <MenuItem value={3}>Ingeniería Industrial</MenuItem>
          <MenuItem value={4}>Ingeniería Electrónica</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Materias por cuatrimestre</InputLabel>
        <Select
          value={numberOfSubjetsPerPeriod}
          label="Materias por cuatrimestre"
          onChange={(e) => setNumberOfSubjetsPerPeriod(Number(e.target.value))}
        >
          <MenuItem value={0}>Seleccionar</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          {/* <MenuItem value={3}>3</MenuItem> */}
        </Select>
      </FormControl>
    </Box>


    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Disponibilidad para cursar</InputLabel>
        <Select
          value={availiabilityForClasses}
          label="Disponibilidad para cursar"
          onChange={(e) => setAvailiabilityForClasses(Number(e.target.value))}
        >
          <MenuItem value={0}>Seleccionar</MenuItem>
          <MenuItem value={1}>Por la mañana (08 a 12 hs)</MenuItem>
          <MenuItem value={2}>Por la tarde (14 a 18 hs)</MenuItem>
          <MenuItem value={3}>Por la noche (18 a 22 hs)</MenuItem>
          <MenuItem value={4}>Todos los turnos</MenuItem>
        </Select>
      </FormControl>
    </Box>


    <Box sx={{ maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel>Riesgo Aceptable</InputLabel>
        <Select
          value={acceptableRisk}
          label="Riesgo Aceptable"
          onChange={(e) => setAcceptableRisk(Number(e.target.value))}
        >
          <MenuItem value={0}>Seleccionar</MenuItem>
          <MenuItem value={90}>90%</MenuItem>
          <MenuItem value={80}>80%</MenuItem>
          <MenuItem value={70}>70%</MenuItem>
          <MenuItem value={60}>60%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
        </Select>
      </FormControl>
    </Box>
      <Button variant="contained" type="button" onClick={handleCalculate}>Calcular</Button>
    </>
  )
}

export default Form;