export type MealType = "breakfast" | "lunch" | "dinner";

export type Meals = {
  [key in MealType]: Food[];
}

interface Food {
  name: string;
  ingredients?: string[];
  timeToPrepare: number;
}
