import { Datagrid, List, TextField } from 'react-admin';

export const DegreeList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label="Título" />
            <TextField source="subjects" label="Materias" />
        </Datagrid>
    </List>
);