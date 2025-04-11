import { db } from "@/firebase.config";
import { Food, Meals } from "@/interfaces/interface";
import { doc, getDoc } from "firebase/firestore";

export const getRandomMeal = (foods: Food[]) => {
  if (foods === undefined || foods.length === 0) {
    return null;
  }
  return foods.at(Math.floor(Math.random() * foods.length));
};

export const getAllMeals = async () => {
  const mealsDocRef = await getDoc(doc(db, "meals", "Mirzin"));
  const data = mealsDocRef.data();
  const meals: Meals = data as Meals;
  return meals;
};
