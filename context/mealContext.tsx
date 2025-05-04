import { Food, Meals, MealType } from "@/interfaces/interface";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { getAllMeals } from "@/services/api";
import { Alert } from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase.config";

type MealContextType = {
  meals: Meals;
  setMeals: (meals: Meals) => void;
  addMeal: (mealType: MealType, meal: Food) => void;
  deleteMeal: (mealType: MealType, index: number) => void;
  updateMeal: (mealType: MealType, index: number, meal: Food) => void;
  isLoading: boolean;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Email: ${user?.email}`);
        if (user?.email) setMeals(await getAllMeals(user?.email));
      } catch (e: any) {
        console.log(e);
        Alert.alert("Could not get your meals", e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addMeal = async (mealType: MealType, meal: Food) => {
    try {
      setIsLoading(true);
      const newMeals = {
        ...meals,
        [mealType]: [...(meals[mealType] || []), meal],
      };
      setMeals(newMeals);
      console.log("Adding meal in database...");
      if (user?.email) await setDoc(doc(db, "meals", user?.email), newMeals);
      console.log("Successfully added meal in database");
      Alert.alert("Success", "Meal added!");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not add meal.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeal = async (mealType: MealType, index: number) => {
    try {
      setIsLoading(true);
      const newMeals = {
        ...meals,
        [mealType]: [
          ...meals[mealType].slice(0, index),
          ...meals[mealType].slice(index + 1),
        ],
      };
      setMeals(newMeals);
      console.log("Deleting meal from database...");
      if (user?.email) await setDoc(doc(db, "meals", user?.email), newMeals);
      console.log("Deleted meal from database successfully");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not delete meal.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeal = async (mealType: MealType, index: number, meal: Food) => {
    try {
      setIsLoading(true);
      const newMeals = {
        ...meals,
        [mealType]: [
          ...meals[mealType].slice(0, index),
          meal,
          ...meals[mealType].slice(index + 1),
        ],
      };
      setMeals(newMeals);
      console.log("Updating meal in database...");
      if (user?.email) await setDoc(doc(db, "meals", user?.email), newMeals);
      console.log("Updated meal in database successfully");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not update meal.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MealContext.Provider
      value={{ isLoading, meals, setMeals, addMeal, deleteMeal, updateMeal }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeal = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
