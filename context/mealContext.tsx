import { Meals } from "@/interfaces/interface";
import React, { createContext, useContext, useState } from "react";

type MealContextType = {
  meals: Meals;
  setMeals: (meals: Meals) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<Meals>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  return (
    <MealContext.Provider value={{ meals, setMeals }}>
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
