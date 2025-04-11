import Button from "@/components/Button";
import { useAuth } from "@/context/authContext";
import { useMeal } from "@/context/mealContext";
import { Meals } from "@/interfaces/interface";
import { getAllMeals } from "@/services/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

export default function HomeScreen() {
  const { isLoading } = useMeal();

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size={50} className="m-auto" />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Button meal="Breakfast" />
          <Button meal="Lunch" />
          <Button meal="Dinner" />
        </View>
      )}
    </>
  );
}
