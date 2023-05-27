interface Dictionary<T> {
  [Key: string]: T;
};

type Subject = {
  id: number,
  name: string,
  profesorships: Professorship[]; 
};

type Degree = {
  id: number, 
  name: string,
  subjects: Subject[]
};

type Professorship = {
  id: number, 
  name: string,
  subject: number,
  feedbackRaiting: number,
  probability: number,
  shift: SubjectShift
};
  
type PlanRequest = {
  degree: number,
  numberOfSubjetsPerPeriod: number,
  availiabilityForClasses: number,
  acceptableRisk: number
};

type SubjectShift = {
  id: number,
  name: string
};

const mySubjectShift: Dictionary<SubjectShift> = {
  1: {
    id: 1,
    name: "Por la mañana (08 a 12 hs)"
  },
  2: {
    id: 2,
    name: 'Por la tarde (14 a 18 hs)'
  },
  3: {
    id: 3,
    name: 'Por la noche (18 a 22 hs)'
  },
  4: {
    id: 4,
    name: 'Todos los turnos'
  }
}
const myProfessorship: Professorship[] = [
  {
    id: 1,
    name: "Álgebra: Cátedra Orecchia",
    subject: 1,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 2,
    name: "Análisis Matemático: Cátedra Acero",
    subject: 2,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 3,
    name: "Organización del Computador: Cátedra Benitez",
    subject: 3,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 4,
    name: "Modelos y Optimización I: Cátedra Ramos",
    subject: 4,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 5,
    name: "Algoritmos y Programación I: Cátedra Rosita",
    subject: 5,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 6,
    name: "Base de Datos: Cátedra Beiro",
    subject: 6,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 7,
    name: "Técnicas de Diseño: Cátedra Paez",
    subject: 7,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 8,
    name: "Administración de Proyectos: Cátedra Miguel",
    subject: 8,
    feedbackRaiting: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  }
];

  
const mySubjects: Subject[] = [
  {
    id: 0,
    name: "Álgebra",
    profesorships: [myProfessorship[0]]
  },
  {
    id: 1,
    name: "Análisis Matemático",
    profesorships: [myProfessorship[1]]
  },
  {
    id: 2,
    name: "Organización del Computador",
    profesorships: [myProfessorship[2]]
  },
  {
    id: 3,
    name: "Modelos y Optimización I",
    profesorships: [myProfessorship[3]]
  },
  {
    id: 4,
    name: "Algoritmos y Programación I",
    profesorships: [myProfessorship[4]]
  },
  {
    id: 5,
    name: "Base de Datos",
    profesorships: [myProfessorship[5]]
  },
  {
    id: 6,
    name: "Técnicas de Diseño",
    profesorships: [myProfessorship[6]]
  },
  {
    id: 7,
    name: "Administración de Proyectos",
    profesorships: [myProfessorship[7]]
  }
];

const degrees: Degree[] = [
  {
    id: 1,
    name: "Ingeniería Informática",
    subjects: mySubjects
  },
  {
    id: 2,
    name: "Lic. en Análisis de Sistemas",
    subjects: mySubjects
  },
  {
    id: 3,
    name: "Ingeniería Industrial",
    subjects: mySubjects
  },
  {
    id: 4,
    name: "Ingeniería Electrónica",
    subjects: mySubjects
  }
];



  export {degrees, mySubjectShift, mySubjects, myProfessorship};
  
  export type {Degree, PlanRequest, SubjectShift}; 