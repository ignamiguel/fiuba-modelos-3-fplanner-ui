import { Datagrid, EmailField, List, TextField } from 'react-admin';

export const StudentList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Padrón" />
            <TextField source="name" label="Nombre y Apellido" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);