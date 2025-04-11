import Button from "@/components/Button";
import { useMeal } from "@/context/mealContext";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import LogoutButton from "@/components/LogOutButton";

export default function HomeScreen() {
  const { isLoading } = useMeal();
  const router = useRouter();
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            logout();
          } catch (e) {
            console.error("Logout failed", e);
          }
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPressIn={handlePress} style={{ marginRight: 16 }}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size={50} className="m-auto" />
      ) : (
        <View style={{ flex: 1 }}>
          <Pressable
            onPress={() => router.push("/addMeal")}
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
            <Ionicons name="add" size={30} color="#fff" />
          </Pressable>
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
        </View>
      )}
    </>
  );
}
