type Dish = {
    name: string,
    price: number,
    portions: number,
    satisfactionLeve: number,
    ingredients: string[],
    restrictions: string[]
  };
  
  type MenuRequest = {
    portions: number,
    budget: number,
    restrictions?: {
      type: string,
      amount: number
    }[],
    satisfaction: number,
    variety: number;
    optimize: "satisfaction" | "cost";
  };
  
  const dishes: Dish[] = [
     {
      name: "Hamburguesas",
      price: 200,
      portions: 2,
      satisfactionLeve: 8,
      ingredients: [
        "pan",
        "carne",
        "queso",
        "tomate",
      ],
      restrictions: []
    },
     {
      name: "Pizza",
      price: 100,
      portions: 4,
      satisfactionLeve: 5,
      ingredients: [
        "pan",
        "queso",
        "tomate",
      ],
      restrictions: []
    },
     {
      name: "Ensalada",
      price: 50,
      portions: 1,
      satisfactionLeve: 3,
      ingredients: [
        "lechuga",
        "tomate",
      ],
      restrictions: [
        "vegan",
        "celiac"
      ]
    },
     {
      name: "Pastas",
      price: 60,
      portions: 2,
      satisfactionLeve: 6,
      ingredients: [
        "pasta",
        "tomate",
      ],
      restrictions: [
        "vegan",
      ]
    },
    {
      name: "Sopa",
      price: 40,
      portions: 1,
      satisfactionLeve: 2,
      ingredients: [
        "agua",
        "tomate",
      ],
      restrictions: [
        "vegan",
        "celiac"
      ]
    },
     {
      name: "Sandwich",
      price: 30,
      portions: 1,
      satisfactionLeve: 6,
      ingredients: [
        "pan",
        "queso",
        "tomate",
      ],
      restrictions: [
      ]
    },
    {
      name: "Papas fritas",
      price: 20,
      portions: 1,
      satisfactionLeve: 7,
      ingredients: [
        "papa",
      ],
      restrictions: [
        "vegan",
        "celiac"
      ]
    },
    {
      name: "Arroz con mariscos",
      price: 500,
      portions: 5,
      satisfactionLeve: 8,
      ingredients: [
        "arroz",
        "mariscos",
      ],
      restrictions: [
        "celiac"
      ]
    },
    {
      name: "Milanesa",
      price: 300,
      portions: 2,
      satisfactionLeve: 7,
      ingredients: [
        "carne",
        "pan",
      ],
      restrictions: [
      ]
    },
    {
      name: "Asado",
      price: 600,
      portions: 5,
      satisfactionLeve: 9,
      ingredients: [
        "carne",
      ],
      restrictions: [
      ]
    },
    {
      name: "Ravioles con Tuco",
      price: 200,
      portions: 2,
      satisfactionLeve: 7,
      ingredients: [
        "pasta",
        "tomate",
      ],
      restrictions: [
        "vegan",
      ]
    },
    {
      name: "Churrasco de Cerdo",
      price: 400,
      portions: 3,
      satisfactionLeve: 4,
      ingredients: [
        "carne",
      ],
      restrictions: [
        "celiac"
      ]
    },
  
  ]
  
  
  export default dishes;
  
  export type {Dish, MenuRequest}; 