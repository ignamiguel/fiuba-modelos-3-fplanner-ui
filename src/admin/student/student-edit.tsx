import { Edit, SimpleForm, TextInput } from 'react-admin';

export const StudentEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" label="Padrón" />
            <TextInput source="name" label="Nombre y Apellido" />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);