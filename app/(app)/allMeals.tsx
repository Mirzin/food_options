import MealList from "@/components/MealList";
import { useMeal } from "@/context/mealContext";
import { ScrollView, View, Text } from "react-native";

export default function AllMeals() {
  return (
    <ScrollView className="p-7">
      <MealList mealType="breakfast" />
      <MealList mealType="lunch"  />
      <MealList mealType="dinner" />
    </ScrollView>
  );
}
