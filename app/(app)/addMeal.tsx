import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Food, MealType } from "@/interfaces/interface";
import { useMeal } from "@/context/mealContext";
import { router, useLocalSearchParams } from "expo-router";

export default function AddMeal() {
  const params = useLocalSearchParams();
  const { meals, addMeal, isLoading, updateMeal } = useMeal();
  const index = Number(params.index);
  const intialMealType = params.mealType as MealType;
  const isUpdateMeal = Boolean(params.updateMeal) || false;
  const initialFood = index ? meals[intialMealType].at(index) : null;
  const [name, setName] = useState(initialFood?.name || "");
  const [mealType, setMealType] = useState<MealType>(
    intialMealType || "breakfast"
  );
  const [ingredientsText, setIngredientsText] = useState(
    initialFood?.ingredients?.join(", ") || ""
  );
  const [prepTime, setPrepTime] = useState(
    initialFood?.timeToPrepare.toString() || ""
  );

  const handleAddMeal = async () => {
    if (!name || !prepTime) {
      Alert.alert("Meal name and prep time are mandatory");
      return;
    }

    const ingredients = ingredientsText
      .split(",")
      .map((item) => item.trim())
      .filter((ingredient) => ingredient !== "");

    const newFood: Food = {
      name,
      timeToPrepare: parseInt(prepTime),
      ingredients,
    };

    if (isUpdateMeal) {
      updateMeal(mealType, index, newFood);
      router.back();
    } else {
      addMeal(mealType, newFood);
      setName("");
      setMealType("breakfast");
      setIngredientsText("");
      setPrepTime("");
    }
  };

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Meal name"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
        maxLength={30}
      />

      <Text>Meal Type</Text>
      <Picker selectedValue={mealType} onValueChange={setMealType}>
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
      </Picker>

      <Text>Ingredients (comma-separated)</Text>
      <TextInput
        value={ingredientsText}
        onChangeText={setIngredientsText}
        placeholder="e.g. eggs, milk, flour"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
        maxLength={100}
      />

      <Text>Prep Time (minutes)</Text>
      <TextInput
        value={prepTime}
        onChangeText={setPrepTime}
        keyboardType="numeric"
        placeholder="10"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6 }}
        maxLength={3}
      />

      <Button
        color="#3b0764"
        title={
          isLoading ? "Updating..." : isUpdateMeal ? "Update Meal" : "Add Meal"
        }
        onPress={handleAddMeal}
        disabled={isLoading}
      />
    </View>
  );
}
