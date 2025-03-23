import Button from "@/components/Button";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
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
  );
}
