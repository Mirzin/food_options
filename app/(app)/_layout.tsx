import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { MealProvider } from "@/context/mealContext";

const RootLayout = () => {
  return (
    <MealProvider>
      <StatusBar backgroundColor="#3b0764" />
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerStyle: { backgroundColor: "#3b0764" },
            headerTitle: "Food Options Random",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="random/[meal]"
          options={{
            headerStyle: { backgroundColor: "#3b0764" },
            headerTitleStyle: {
              color: "white",
              fontWeight: "bold",
              fontSize: 24,
            },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
          }}
        />
      </Stack>
    </MealProvider>
  );
};

export default RootLayout;
