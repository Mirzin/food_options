import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#3b0764" />
      <Stack>
        <Stack.Screen
          name="signIn"
          options={{
            headerStyle: { backgroundColor: "#3b0764" },
            headerTitle: "Sign In",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="signUp"
          options={{
            headerStyle: { backgroundColor: "#3b0764" },
            headerTitle: "Sign Up",
            headerTitleStyle: { color: "white", fontWeight: "bold" },
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
