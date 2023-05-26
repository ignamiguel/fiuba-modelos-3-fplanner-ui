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

    {/* { <Resource name="posts" list={ListGuesser} /> */}
    <Resource name="degrees" list={ListGuesser} show={ShowGuesser}/> 
    <Resource name="students" list={ListGuesser} show={ShowGuesser} edit={EditGuesser}/>
  </Admin>
);

export default App;