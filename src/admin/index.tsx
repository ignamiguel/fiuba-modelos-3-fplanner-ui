import { Admin,
    Resource, 
    ListGuesser, 
    ShowGuesser, 
    EditGuesser, 
    LayoutComponent, 
    Layout } from "react-admin";
import { dataProvider } from '../dataProviders/fiubaDataProvider';
import { Dashboard } from '../Dashboard';
import { authProvider } from '../authProvider';
import MyAppBar from "./customAppBar";

const myLayout: LayoutComponent = (props) => <Layout {...props} appBar={MyAppBar} />;

const App = () => (
  <Admin 
    title={"FIUBA Planner"}
    layout={myLayout}
    authProvider={authProvider} 
    dataProvider={dataProvider} 
    dashboard={Dashboard}  >

    <Resource name="students" options={{ label: 'Alumnos' }} list={ListGuesser} show={ShowGuesser} />
    <Resource name="degrees" options={{ label: 'Carreras' }} list={ListGuesser} show={ShowGuesser}/> 
    <Resource name="subjects" options={{ label: 'Materias' }} list={ListGuesser} />
    <Resource name="profeshorship" options={{ label: 'Cátedras' }} list={ListGuesser} />
  </Admin>
);

export default App;