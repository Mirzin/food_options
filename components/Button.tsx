import { Text, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import React from "react";

interface Props {
  meal: string;
}

const Button = ({ meal }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/random/${meal}`);
  }

  return (
      <TouchableOpacity className="bg-purple-950 rounded-lg p-5 w-72" onPress={handleClick}>
        <Text className="text-white font-semibold text-3xl text-center">
          {meal}
        </Text>
      </TouchableOpacity>
  );
};

export default Button;
