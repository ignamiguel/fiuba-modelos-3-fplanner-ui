import { Admin,
    Resource, 
    LayoutComponent, 
    Layout} from "react-admin";
import { dataProvider } from '../dataProviders/fiubaDataProvider';
import { Dashboard } from '../Dashboard';
import { authProvider } from '../authProvider';
import MyAppBar from "./customAppBar";
import { StudentCreate, StudentEdit, StudentList, StudentShow } from "./student";
import { DegreeList, DegreeShow } from "./degree";
import { SubjectList, SubjectShow } from "./subject";
import { ProfessorshipList, ProfessorshipShow } from "./professorship";


const myLayout: LayoutComponent = (props) => <Layout {...props} appBar={MyAppBar} />;

const App = () => (
  <Admin 
    title={"FIUBA Planner"}
    layout={myLayout}
    authProvider={authProvider} 
    dataProvider={dataProvider} 
    dashboard={Dashboard}  >

    <Resource name="students" options={{ label: 'Alumnos' }} list={StudentList} show={StudentShow} edit={StudentEdit} create={StudentCreate} />
    <Resource name="degrees" options={{ label: 'Carreras' }} list={DegreeList} show={DegreeShow}/> 
    <Resource name="subjects" options={{ label: 'Materias' }} list={SubjectList} show={SubjectShow}/>
    <Resource name="professorships" options={{ label: 'Cátedras' }} list={ProfessorshipList} show={ProfessorshipShow}/>
  </Admin>
);

export default App;