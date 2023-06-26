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
  feedbackRating: number,
  probability: number,
  shift: SubjectShift
};

type PlanRequest = {
  degreeIndex: number,
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
};

const professorshipArray: Professorship[] = [
  {
    id: 0,
    name: "Álgebra: Cátedra Orecchia",
    subject: 0,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 1,
    name: "Análisis Matemático: Cátedra Acero",
    subject: 1,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 2,
    name: "Organización del Computador: Cátedra Benitez",
    subject: 2,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 3,
    name: "Modelos y Optimización I: Cátedra Ramos",
    subject: 3,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 4,
    name: "Algoritmos y Programación I: Cátedra Rosita",
    subject: 4,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 5,
    name: "Base de Datos: Cátedra Beiro",
    subject: 5,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 6,
    name: "Técnicas de Diseño: Cátedra Paez",
    subject: 6,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  },
  {
    id: 7,
    name: "Administración de Proyectos: Cátedra Miguel",
    subject: 7,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  }
];

const professorshipDic: Dictionary<Professorship[]> = {
  0: [{
    id: 0,
    name: "Álgebra: Cátedra Orecchia (1)",
    subject: 0,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  }, {
    id: 10,
    name: "Álgebra: Cátedra Orecchia (2)",
    subject: 0,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  },],
  1: [{
    id: 1,
    name: "Análisis Matemático: Cátedra Acero (1)",
    subject: 1,
    feedbackRating: 4,
    probability: 0.79,
    shift: mySubjectShift[1]
  },{
    id: 11,
    name: "Análisis Matemático: Cátedra Acero (2)",
    subject: 1,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }],
  2: [{
    id: 2,
    name: "Organización del Computador: Cátedra Benitez (1)",
    subject: 2,
    feedbackRating: 4,
    probability: 0.59,
    shift: mySubjectShift[1]
  }, {
    id: 12,
    name: "Organización del Computador: Cátedra Benitez (2)",
    subject: 2,
    feedbackRating: 3,
    probability: 0.69,
    shift: mySubjectShift[2]
  }],
  3: [{
    id: 3,
    name: "Modelos y Optimización I: Cátedra Ramos (1)",
    subject: 3,
    feedbackRating: 4,
    probability: 0.39,
    shift: mySubjectShift[1]
  }, {
    id: 13,
    name: "Modelos y Optimización I: Cátedra Ramos (2)",
    subject: 3,
    feedbackRating: 3,
    probability: 0.49,
    shift: mySubjectShift[2]
  }],
  4: [{
    id: 4,
    name: "Algoritmos y Programación I: Cátedra Rosita (1)",
    subject: 4,
    feedbackRating: 4,
    probability: 0.79,
    shift: mySubjectShift[1]
  }, {
    id: 14,
    name: "Algoritmos y Programación I: Cátedra Rosita (2)",
    subject: 4,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }],
  5: [{
    id: 5,
    name: "Base de Datos: Cátedra Beiro (1)",
    subject: 5,
    feedbackRating: 4,
    probability: 0.49,
    shift: mySubjectShift[1]
  }, {
    id: 15,
    name: "Base de Datos: Cátedra Beiro (2)",
    subject: 5,
    feedbackRating: 3,
    probability: 0.79,
    shift: mySubjectShift[2]
  }],
  6: [{
    id: 6,
    name: "Técnicas de Diseño: Cátedra Paez (1)",
    subject: 6,
    feedbackRating: 4,
    probability: 0.49,
    shift: mySubjectShift[1]
  }, {
    id: 16,
    name: "Técnicas de Diseño: Cátedra Paez (2)",
    subject: 6,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[2]
  }],
  7: [{
    id: 7,
    name: "Administración de Proyectos: Cátedra Miguel (1)",
    subject: 7,
    feedbackRating: 4,
    probability: 0.29,
    shift: mySubjectShift[1]
  }, {
    id: 17,
    name: "Administración de Proyectos: Cátedra Miguel (2)",
    subject: 7,
    feedbackRating: 3,
    probability: 0.49,
    shift: mySubjectShift[2]
  }]
};

const subjectList: Subject[] = [
  {
    id: 0,
    name: "Álgebra",
    profesorships: []
  },
  {
    id: 1,
    name: "Análisis Matemático",
    profesorships: [professorshipArray[1]]
  },
  {
    id: 2,
    name: "Organización del Computador",
    profesorships: [professorshipArray[2]]
  },
  {
    id: 3,
    name: "Modelos y Optimización I",
    profesorships: [professorshipArray[3]]
  },
  {
    id: 4,
    name: "Algoritmos y Programación I",
    profesorships: [professorshipArray[4]]
  },
  {
    id: 5,
    name: "Base de Datos",
    profesorships: [professorshipArray[5]]
  },
  {
    id: 6,
    name: "Técnicas de Diseño",
    profesorships: [professorshipArray[6]]
  },
  {
    id: 7,
    name: "Administración de Proyectos",
    profesorships: [professorshipArray[7]]
  }
];

const degreeList: Degree[] = [
  {
    id: 1,
    name: "Ingeniería Informática",
    subjects: subjectList
  },
  {
    id: 2,
    name: "Lic. en Análisis de Sistemas",
    subjects: subjectList
  },
  {
    id: 3,
    name: "Ingeniería Industrial",
    subjects: subjectList
  },
  {
    id: 4,
    name: "Ingeniería Electrónica",
    subjects: subjectList
  }
];


export { degreeList, mySubjectShift, subjectList, professorshipArray, professorshipDic};

export type { Degree, PlanRequest, SubjectShift, Professorship }; 