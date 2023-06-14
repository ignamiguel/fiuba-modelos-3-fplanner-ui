import { Create, SimpleForm, TextInput } from 'react-admin';

export const StudentCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" label="Padrón" />
            <TextInput source="name" label="Nombre y Apellido" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);