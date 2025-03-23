import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#3b0764" />
      <Stack>
        <Stack.Screen
          name="index"
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
}
