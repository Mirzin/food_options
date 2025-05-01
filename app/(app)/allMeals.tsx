import MealList from "@/components/MealList";
import { useMeal } from "@/context/mealContext";
import { ScrollView, View, Text } from "react-native";

export default function AllMeals() {
  const { meals } = useMeal();
  const { breakfast, lunch, dinner } = meals;
  return (
    <ScrollView className="p-7">
      <MealList mealType="Breakfast" mealList={breakfast} />
      <MealList mealType="Lunch" mealList={lunch} />
      <MealList mealType="Dinner" mealList={dinner} />
    </ScrollView>
  );
}
