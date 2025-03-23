import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getRandomMeal } from "@/services/api";

const Meal = () => {
  const { meal } = useLocalSearchParams();
  const food = getRandomMeal(meal.toString());
  const [randomFood, setRandomFood] = useState(food);
  return (
    <View className="items-center my-auto">
      <Text className="text-4xl">{randomFood?.name}</Text>
      <Text className="text-3xl">{randomFood?.ingredients?.join(", ")}</Text>
      <Text className="text-3xl">{randomFood?.timeToPrepare} mins</Text>
      <TouchableOpacity
        className="bg-purple-950 p-5 rounded-xl mt-10"
        onPress={() => {
          setRandomFood(getRandomMeal(meal.toString()));
        }}
      >
        <Text className="text-white text-3xl">Randomize</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Meal;
