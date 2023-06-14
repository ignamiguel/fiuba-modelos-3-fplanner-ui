import { NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const SubjectShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="code" label="Código de Materia" />
            <TextField source="name" label="Nombre de la Materia" />
            <NumberField source="credits" label="Créditos" />
        </SimpleShowLayout>
    </Show>
);