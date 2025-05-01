import { db } from "@/firebase.config";
import { Food, Meals } from "@/interfaces/interface";
import { doc, getDoc } from "firebase/firestore";

export const getRandomMeal = (foods: Food[]) => {
  if (foods === undefined || foods.length === 0) {
    return null;
  }
  return foods.at(Math.floor(Math.random() * foods.length));
};

export const getAllMeals = async (username: string) => {
  console.log("Getting meals from DB...");
  const mealsDocRef = await getDoc(doc(db, "meals", username));
  const data = mealsDocRef.data();
  console.log(data);
  return data as Meals;
};
