import { AppBar } from "react-admin";
import Box from '@mui/material/Box';

import Logo from "./logo.png";

const MyAppBar = ({ ...props }) => (
  <AppBar {...props}>
    <Box flex={1} /> 
    { <img src={Logo} height={"52"} width={"115"} className="App-logo" alt="logo" /> }
    <Box flex={1} /> 
  </AppBar>
);

export default (MyAppBar);