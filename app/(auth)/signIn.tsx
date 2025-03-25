import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as widthPercentage,
  heightPercentageToDP as heightPercentage,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center">
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Username"
      ></TextInput>
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Password"
      ></TextInput>
      <Pressable
        className="items-start my-3 ml-7"
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <Text className="text-lg mb-3 font-bold text-blue-800">
          Forgot password?
        </Text>
      </Pressable>
      <TouchableOpacity
        className="bg-purple-950 h-16 justify-center rounded-2xl mx-6"
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <Text className="text-white text-2xl text-center">Sign In</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-3">
        <Text className="text-lg font-bold text-gray-700">
          Don't have an account?{" "}
        </Text>
        <Pressable onPress={() => router.push("/signUp")}>
          <Text className="font-bold text-lg text-blue-800">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
