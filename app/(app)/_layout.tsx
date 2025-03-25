import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
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
        <Stack.Screen name="random/[meal]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default RootLayout;
