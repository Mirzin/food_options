import { useMeal } from "@/context/mealContext";
import { Food, MealType } from "@/interfaces/interface";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, FlatList, Pressable, Alert } from "react-native";

interface Props {
  mealType: MealType;
}

export default function MealList({ mealType }: Props) {
  const { meals, deleteMeal, isLoading } = useMeal();
  const router = useRouter();

  const renderItem = ({ item, index }: { item: Food; index: number }) => {
    const handleUpdate = () => {
      console.log(`Edit Pressed on ${mealType}-${index}`);
      router.push({
        pathname: "/addMeal",
        params: {
          mealType,
          index,
          updateMeal: "true",
        },
      });
    };
    
    const handleDelete = () => {
      console.log(`Delete Pressed on ${mealType}-${index}`);
      Alert.alert(
        "Delete Meal",
        `Are you sure you want to delete ${
          meals[mealType].at(index)?.name
        } permanently?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                deleteMeal(mealType, index);
              } catch (e) {
                console.error("Delete failed", e);
              }
            },
          },
        ]
      );
    };

    return (
      <View className="py-2">
        <View className="mb-2 flex-row justify-between">
          <View className="flex-row">
            <Pressable className="mr-2" onPress={handleUpdate}>
              <Ionicons name="create" size={30} />
            </Pressable>
            <Text numberOfLines={1} className="text-2xl">
              {item.name}
            </Text>
          </View>
          <Pressable onPress={handleDelete}>
            <Ionicons name="trash" size={30} />
          </Pressable>
        </View>
        <View className="h-0.5 bg-gray-300"></View>
      </View>
    );
  };

  return (
    <View className="mb-6">
      <Text className="text-4xl font-bold text-center py-2 bg-[#3b0764] text-white rounded-lg">
        {mealType.substring(0, 1).toUpperCase().concat(mealType.substring(1))}
      </Text>
      <FlatList
        data={meals[mealType]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
}
