import { Datagrid, List, NumberField, TextField } from 'react-admin';

export const ProfessorshipList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label="Cátedra" />
            <TextField source="subject" label="Materia" />
            <NumberField source="feedbackRating" label="Feedback Raiting" />
            <NumberField source="probability" label="Probabilidad de Aprobar" />
            <TextField source="shift" label="Turno" />
        </Datagrid>
    </List>
);