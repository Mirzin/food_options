import { Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React from "react";

interface Props {
  meal: string;
}

const Button = ({ meal }: Props) => {
  return (
    <Link
      href={{
        pathname: "/random/[meal]",
        params: { meal },
      }}
      asChild
    >
      <TouchableOpacity className="bg-purple-950 rounded-lg p-5 w-72">
        <Text className="text-white font-semibold text-3xl text-center">
          {meal}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default Button;
