import { NumberField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const ProfessorshipShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" label="Cátedra" />
            <TextField source="subject" label="Materia" />
            <NumberField source="feedbackRating" label="Feedback Raiting" />
            <NumberField source="probability" label="Probabilidad de Aprobar" />
            <TextField source="shift" label="Turno"/>
        </SimpleShowLayout>
    </Show>
);