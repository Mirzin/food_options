import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getRandomMeal } from "@/services/api";
import { useMeal } from "@/context/mealContext";
import { MealType } from "@/interfaces/interface";
import { Ionicons } from "@expo/vector-icons";

const Meal = () => {
  const { meal } = useLocalSearchParams();
  const { meals } = useMeal();

  const router = useRouter();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal?.toString() ?? "Meal",
    });
  }, [navigation, meal]);

  const randomiseFood = () => {
    const food = getRandomMeal(
      meals[meal?.toString().toLowerCase() as MealType]
    );
    if (food === null) {
      Alert.alert(
        "No Options Available",
        "Please add options at the home page",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
      return;
    }
    return food;
  };
  const food = randomiseFood();
  const [randomFood, setRandomFood] = useState(food);

  return (
    <>
      {!randomFood ? (
        <View />
      ) : (
        <View className="flex-1">
          <Pressable
            onPress={() => router.push("/allMeals")}
            style={{
              position: "absolute",
              top: 30,
              right: 20,
              zIndex: 1,
              backgroundColor: "#3b0764",
              borderRadius: 999,
              padding: 12,
              elevation: 5,
            }}
          >
            <Ionicons name="list" size={30} color="#fff" />
          </Pressable>
          <View className="items-center my-auto">
            <Text className="text-4xl">{randomFood?.name}</Text>
            <Text className="text-3xl">
              {randomFood?.ingredients?.join(", ")}
            </Text>
            <Text className="text-3xl">{randomFood?.timeToPrepare} mins</Text>
            <TouchableOpacity
              className="bg-purple-950 p-5 rounded-xl mt-10"
              onPress={() => {
                setRandomFood(randomiseFood());
              }}
            >
              <Text className="text-white text-3xl">Randomize</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Meal;
