interface Dictionary<T> {
  [Key: string]: T;
}

type Subject = {
  id: number,
  name: string
};

type Degree = {
  id: number, 
  name: string,
  subjects: Subject[]
};
  
type PlanRequest = {
  degree: number,
  numberOfSubjetsPerPeriod: number,
  availiabilityForClasses: number,
  acceptableRisk: number
};

type SubjectShift = {
  name: string
};

const mySubjectShift: Dictionary<SubjectShift> = {
  1: {
    name: "Por la mañana (08 a 12 hs)"
  },
  2: {
    name: 'Por la tarde (14 a 18 hs)'
  },
  3: {
    name: 'Por la noche (18 a 22 hs)'
  },
  4: {
    name: 'Todos los turnos'
  }
}




const degrees: Degree[] = [
  {
    id: 1,
    name: "Ingeniería Informática",
    subjects: []
  },
  {
    id: 2,
    name: "Lic. en Análisis de Sistemas",
    subjects: []
  },
  {
    id: 3,
    name: "Ingeniería Industrial",
    subjects: []
  },
  {
    id: 4,
    name: "Ingeniería Electrónica",
    subjects: []
  }
];
  
  // const dishes: Degree[] = [
  //    {
  //     name: "Hamburguesas",
  //     price: 200,
  //     portions: 2,
  //     satisfactionLeve: 8,
  //     ingredients: [
  //       "pan",
  //       "carne",
  //       "queso",
  //       "tomate",
  //     ],
  //     restrictions: []
  //   },
  //    {
  //     name: "Pizza",
  //     price: 100,
  //     portions: 4,
  //     satisfactionLeve: 5,
  //     ingredients: [
  //       "pan",
  //       "queso",
  //       "tomate",
  //     ],
  //     restrictions: []
  //   },
  //    {
  //     name: "Ensalada",
  //     price: 50,
  //     portions: 1,
  //     satisfactionLeve: 3,
  //     ingredients: [
  //       "lechuga",
  //       "tomate",
  //     ],
  //     restrictions: [
  //       "vegan",
  //       "celiac"
  //     ]
  //   },
  //    {
  //     name: "Pastas",
  //     price: 60,
  //     portions: 2,
  //     satisfactionLeve: 6,
  //     ingredients: [
  //       "pasta",
  //       "tomate",
  //     ],
  //     restrictions: [
  //       "vegan",
  //     ]
  //   },
  //   {
  //     name: "Sopa",
  //     price: 40,
  //     portions: 1,
  //     satisfactionLeve: 2,
  //     ingredients: [
  //       "agua",
  //       "tomate",
  //     ],
  //     restrictions: [
  //       "vegan",
  //       "celiac"
  //     ]
  //   },
  //    {
  //     name: "Sandwich",
  //     price: 30,
  //     portions: 1,
  //     satisfactionLeve: 6,
  //     ingredients: [
  //       "pan",
  //       "queso",
  //       "tomate",
  //     ],
  //     restrictions: [
  //     ]
  //   },
  //   {
  //     name: "Papas fritas",
  //     price: 20,
  //     portions: 1,
  //     satisfactionLeve: 7,
  //     ingredients: [
  //       "papa",
  //     ],
  //     restrictions: [
  //       "vegan",
  //       "celiac"
  //     ]
  //   },
  //   {
  //     name: "Arroz con mariscos",
  //     price: 500,
  //     portions: 5,
  //     satisfactionLeve: 8,
  //     ingredients: [
  //       "arroz",
  //       "mariscos",
  //     ],
  //     restrictions: [
  //       "celiac"
  //     ]
  //   },
  //   {
  //     name: "Milanesa",
  //     price: 300,
  //     portions: 2,
  //     satisfactionLeve: 7,
  //     ingredients: [
  //       "carne",
  //       "pan",
  //     ],
  //     restrictions: [
  //     ]
  //   },
  //   {
  //     name: "Asado",
  //     price: 600,
  //     portions: 5,
  //     satisfactionLeve: 9,
  //     ingredients: [
  //       "carne",
  //     ],
  //     restrictions: [
  //     ]
  //   },
  //   {
  //     name: "Ravioles con Tuco",
  //     price: 200,
  //     portions: 2,
  //     satisfactionLeve: 7,
  //     ingredients: [
  //       "pasta",
  //       "tomate",
  //     ],
  //     restrictions: [
  //       "vegan",
  //     ]
  //   },
  //   {
  //     name: "Churrasco de Cerdo",
  //     price: 400,
  //     portions: 3,
  //     satisfactionLeve: 4,
  //     ingredients: [
  //       "carne",
  //     ],
  //     restrictions: [
  //       "celiac"
  //     ]
  //   },
  // ]
  
  
  export {degrees, mySubjectShift};
  
  export type {Degree, PlanRequest, SubjectShift}; 