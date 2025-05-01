import { Meals } from "@/interfaces/interface";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { getAllMeals } from "@/services/api";
import { Alert } from "react-native";

type MealContextType = {
  meals: Meals;
  setMeals: (meals: Meals) => void;
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

  return (
    <MealContext.Provider value={{ isLoading, meals, setMeals }}>
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
