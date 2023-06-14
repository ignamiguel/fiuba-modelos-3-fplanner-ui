import { EmailField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const StudentShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="Padrón" />
            <TextField source="name" label="Nombre y Apellido" />
            <EmailField source="email" />
        </SimpleShowLayout>
    </Show>
);