import { Food } from "@/interfaces/interface";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, Pressable } from "react-native";

interface Props {
  mealType: String;
  mealList: Food[];
}

const renderItem = ({ item, index }: { item: Food; index: number }) => (
  <View className="py-2">
    <View className="mb-2 flex-row justify-between">
      <Text numberOfLines={1} className="text-2xl">
        {item.name}
      </Text>
      <View className="flex-row">
        <Pressable
          onPress={() => console.log(`Edit Pressed on item index: ${index}`)}
        >
          <Ionicons name="create" size={30} />
        </Pressable>
        <Pressable
          onPress={() => console.log(`Delete Pressed on item index: ${index}`)}
        >
          <Ionicons name="trash" size={30} />
        </Pressable>
      </View>
    </View>
    <View className="h-0.5 bg-gray-300"></View>
  </View>
);

export default function MealList({ mealType, mealList }: Props) {
  return (
    <View className="mb-6">
      <Text className="text-4xl font-bold text-center py-2 bg-[#3b0764] text-white rounded-lg">
        {mealType}
      </Text>
      <FlatList
        data={mealList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
}
