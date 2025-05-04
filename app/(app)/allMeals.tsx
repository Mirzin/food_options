import MealList from "@/components/MealList";
import { ScrollView } from "react-native";

export default function AllMeals() {
  return (
    <ScrollView className="p-7">
      <MealList mealType="breakfast" />
      <MealList mealType="lunch"  />
      <MealList mealType="dinner" />
    </ScrollView>
  );
}
