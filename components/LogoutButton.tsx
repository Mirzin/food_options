import { TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

export default function LogoutButton() {
  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
          } catch (e) {
            console.error("Logout failed", e);
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity onPressIn={handlePress} style={{ marginRight: 16 }}>
      <Ionicons name="log-out-outline" size={20} color="white" />
    </TouchableOpacity>
  );
}
