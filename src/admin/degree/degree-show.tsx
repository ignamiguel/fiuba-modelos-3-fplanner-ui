import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const DegreeShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" label="Título"  />
            <TextField source="subjects" label="Materias"  />
        </SimpleShowLayout>
    </Show>
);