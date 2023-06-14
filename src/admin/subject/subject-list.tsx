import { Datagrid, List, NumberField, TextField } from 'react-admin';

export const SubjectList = () => (
    <List>
        <Datagrid rowClick="show">
            {/* <TextField source="id" /> */}
            <TextField source="code" label="Código" />
            <TextField source="name" label="Materia" />
            <NumberField source="credits" label="Créditos" />
        </Datagrid>
    </List>
);