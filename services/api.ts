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

const lunchOptions: Food[] = [
  {
    name: "Pasta",
    ingredients: ["pasta", "salt"],
    timeToPrepare: 40,
  },
];

const dinnertOptions: Food[] = [
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
  switch (mealType.toLowerCase()) {
    case "breakfast":
      return breakfastOptions.at(
        Math.floor(Math.random() * breakfastOptions.length)
      );
    case "lunch":
      return lunchOptions.at(Math.floor(Math.random() * lunchOptions.length));
    case "dinner":
      return dinnertOptions.at(
        Math.floor(Math.random() * dinnertOptions.length)
      );
  }
};
