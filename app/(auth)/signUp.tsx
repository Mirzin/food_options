import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as widthPercentage,
  heightPercentageToDP as heightPercentage,
} from "react-native-responsive-screen";

import { useAuth } from "@/context/authContext";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { register } = useAuth();

  const handleSignUp = async () => {
    if (!userNameRef.current || !emailRef.current || !passwordRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }

    // register process
    setLoading(true);
    let response = await register(
      userNameRef.current,
      emailRef.current,
      passwordRef.current
    );
    setLoading(false);
    console.log(response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };
  return (
    <View className="flex-1 justify-center">
      <TextInput
        onChangeText={(value) => (userNameRef.current = value)}
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Username"
      ></TextInput>
      <TextInput
        onChangeText={(value) => (emailRef.current = value)}
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Email"
      ></TextInput>
      <TextInput
        onChangeText={(value) => (passwordRef.current = value)}
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        style={{ height: heightPercentage(8) }}
        placeholder="Password"
        secureTextEntry
      ></TextInput>
      <>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            className="bg-purple-950 h-16 justify-center rounded-2xl mx-6"
            onPress={handleSignUp}
          >
            <Text className="text-white text-2xl text-center">Sign Up</Text>
          </TouchableOpacity>
        )}
      </>
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
