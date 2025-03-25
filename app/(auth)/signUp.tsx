import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as widthPercentage,
  heightPercentageToDP as heightPercentage,
} from "react-native-responsive-screen";

const SignUp = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center">
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Username"
      ></TextInput>
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Email"
      ></TextInput>
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Password"
      ></TextInput>
      <TouchableOpacity
        className="bg-purple-950 h-16 justify-center rounded-2xl mx-6"
        onPress={() => {
          console.log("Pressed");
        }}
      >
        <Text className="text-white text-2xl text-center">Sign Up</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-3">
        <Text className="text-lg font-bold text-gray-700">
          Already have an account?{" "}
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text className="font-bold text-lg text-blue-800">Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
