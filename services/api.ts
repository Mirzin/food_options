const breakfastOptions: Food[] = [
  {
    name: "Eggs and Bread",
    ingredients: ["bread", "eggs", "salt", "butter"],
    timeToPrepare: 20,
  },
  {
    name: "Banana Fry",
    timeToPrepare: 20,
  },
  {
    name: "Dosa, chutney",
    timeToPrepare: 20,
  },
];


export const getRandomMeal = (mealType: string) => {
  switch(mealType.toLowerCase()) {
    case "breakfast": 
      const meal = breakfastOptions.at(Math.floor(Math.random() * breakfastOptions.length));
      return meal;
  }
}