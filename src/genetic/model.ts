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
    id: 1,
    name: "Álgebra: Cátedra Orecchia (TM: Turno Mañana)",
    subject: 0,
    feedbackRating: 4,
    probability: 0.99,
    shift: mySubjectShift[1]
  }, {
    id: 2,
    name: "Álgebra: Cátedra Orecchia (TT: Turno Tarde)",
    subject: 0,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }, {
    id: 3,
    name: "Álgebra: Cátedra Perez (TM: Turno Mañana)",
    subject: 0,
    feedbackRating: 5,
    probability: 0.79,
    shift: mySubjectShift[1]
  }, {
    id: 4,
    name: "Álgebra: Cátedra Perez (TT: Turno Tarde)",
    subject: 0,
    feedbackRating: 5,
    probability: 0.59,
    shift: mySubjectShift[2]
  }],
  1: [{
    id: 5,
    name: "Análisis Matemático: Cátedra Acero (TM: Turno Mañana)",
    subject: 1,
    feedbackRating: 4,
    probability: 0.79,
    shift: mySubjectShift[1]
  },{
    id: 6,
    name: "Análisis Matemático: Cátedra Acero (TT: Turno Tarde)",
    subject: 1,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }, {
    id: 7,
    name: "Análisis Matemático: Cátedra Gomez (TM: Turno Mañana)",
    subject: 1,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[1]
  },{
    id: 8,
    name: "Análisis Matemático: Cátedra Gomez (TT: Turno Tarde)",
    subject: 1,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }],
  2: [{
    id: 9,
    name: "Organización del Computador: Cátedra Benitez (TM: Turno Mañana)",
    subject: 2,
    feedbackRating: 4,
    probability: 0.79,
    shift: mySubjectShift[1]
  }, {
    id: 10,
    name: "Organización del Computador: Cátedra Benitez (TT: Turno Tarde)",
    subject: 2,
    feedbackRating: 3,
    probability: 0.69,
    shift: mySubjectShift[2]
  }, {
    id: 11,
    name: "Organización del Computador: Cátedra Ramirez (TM: Turno Mañana)",
    subject: 2,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[1]
  }, {
    id: 12,
    name: "Organización del Computador: Cátedra Ramirez (TT: Turno Tarde)",
    subject: 2,
    feedbackRating: 4,
    probability: 0.59,
    shift: mySubjectShift[2]
  }],
  3: [{
    id: 13,
    name: "Modelos y Optimización I: Cátedra Ramos (TM: Turno Mañana)",
    subject: 3,
    feedbackRating: 4,
    probability: 0.49,
    shift: mySubjectShift[1]
  }, {
    id: 14,
    name: "Modelos y Optimización I: Cátedra Ramos (TT: Turno Tarde)",
    subject: 3,
    feedbackRating: 4,
    probability: 0.69,
    shift: mySubjectShift[2]
  }, {
    id: 15,
    name: "Modelos y Optimización I: Cátedra Fernandez (TM: Turno Mañana)",
    subject: 3,
    feedbackRating: 4,
    probability: 0.59,
    shift: mySubjectShift[1]
  }, {
    id: 16,
    name: "Modelos y Optimización I: Cátedra Fernandez (TT: Turno Tarde)",
    subject: 3,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }],
  4: [{
    id: 17,
    name: "Algoritmos y Programación I: Cátedra Rosita (TM: Turno Mañana)",
    subject: 4,
    feedbackRating: 4,
    probability: 0.79,
    shift: mySubjectShift[1]
  }, {
    id: 18,
    name: "Algoritmos y Programación I: Cátedra Rosita (TT: Turno Tarde)",
    subject: 4,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }, {
    id: 19,
    name: "Algoritmos y Programación I: Cátedra Mendez (TM: Turno Mañana)",
    subject: 4,
    feedbackRating: 3,
    probability: 0.79,
    shift: mySubjectShift[1]
  }, {
    id: 20,
    name: "Algoritmos y Programación I: Cátedra Mendez (TT: Turno Tarde)",
    subject: 4,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[2]
  }],
  5: [{
    id: 21,
    name: "Base de Datos: Cátedra Beiro (TM: Turno Mañana)",
    subject: 5,
    feedbackRating: 4,
    probability: 0.59,
    shift: mySubjectShift[1]
  }, {
    id: 22,
    name: "Base de Datos: Cátedra Beiro (TT: Turno Tarde)",
    subject: 5,
    feedbackRating: 3,
    probability: 0.79,
    shift: mySubjectShift[2]
  }, {
    id: 23,
    name: "Base de Datos: Cátedra Vargas (TM: Turno Mañana)",
    subject: 5,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[1]
  }, {
    id: 24,
    name: "Base de Datos: Cátedra Vargas (TT: Turno Tarde)",
    subject: 5,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[2]
  }],
  6: [{
    id: 25,
    name: "Técnicas de Diseño: Cátedra Paez (TM: Turno Mañana)",
    subject: 6,
    feedbackRating: 4,
    probability: 0.59,
    shift: mySubjectShift[1]
  }, {
    id: 26,
    name: "Técnicas de Diseño: Cátedra Paez (TT: Turno Tarde)",
    subject: 6,
    feedbackRating: 3,
    probability: 0.99,
    shift: mySubjectShift[2]
  }, {
    id: 27,
    name: "Técnicas de Diseño: Cátedra Turri (TM: Turno Mañana)",
    subject: 6,
    feedbackRating: 5,
    probability: 0.49,
    shift: mySubjectShift[1]
  }, {
    id: 28,
    name: "Técnicas de Diseño: Cátedra Turri (TT: Turno Tarde)",
    subject: 6,
    feedbackRating: 5,
    probability: 0.79,
    shift: mySubjectShift[2]
  }],
  7: [{
    id: 29,
    name: "Administración de Proyectos: Cátedra Miguel (TM: Turno Mañana)",
    subject: 7,
    feedbackRating: 4,
    probability: 0.29,
    shift: mySubjectShift[1]
  }, {
    id: 30,
    name: "Administración de Proyectos: Cátedra Miguel (TT: Turno Tarde)",
    subject: 7,
    feedbackRating: 3,
    probability: 0.59,
    shift: mySubjectShift[2]
  },{
    id: 31,
    name: "Administración de Proyectos: Cátedra Otero (TM: Turno Mañana)",
    subject: 7,
    feedbackRating: 3,
    probability: 0.89,
    shift: mySubjectShift[1]
  }, {
    id: 32,
    name: "Administración de Proyectos: Cátedra Otero (TT: Turno Tarde)",
    subject: 7,
    feedbackRating: 2,
    probability: 0.99,
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