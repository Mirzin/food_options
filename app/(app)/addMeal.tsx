import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Food, MealType } from "@/interfaces/interface";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useAuth } from "@/context/authContext";
import { useMeal } from "@/context/mealContext";

export default function AddMeal() {
  const [name, setName] = useState("");
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [ingredientsText, setIngredientsText] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { meals, setMeals } = useMeal();

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

    try {
      setLoading(true);
      const newMeals = {
        ...meals,
        [mealType]: [...(meals[mealType] || []), newFood],
      };
      setMeals(newMeals);
      if (user?.email) await setDoc(doc(db, "meals", user?.email), newMeals);
      Alert.alert("Success", "Meal added!");
      setName("");
      setMealType("breakfast");
      setIngredientsText("");
      setPrepTime("");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Could not add meal.");
    } finally {
      setLoading(false);
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
        title={loading ? "Adding..." : "Add Meal"}
        onPress={handleAddMeal}
        disabled={loading}
      />
    </View>
  );
}
