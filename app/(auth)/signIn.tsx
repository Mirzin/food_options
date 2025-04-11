import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  heightPercentageToDP as heightPercentage,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userNameRef = useRef("");
  const passwordRef = useRef("");

  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!userNameRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields");
      return;
    }

    // login process
    setLoading(true);
    let response = await login(userNameRef.current, passwordRef.current);
    setLoading(false);
    console.log(response);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 mb-10 p-5"
        onChangeText={(value) => (userNameRef.current = value)}
        style={{ height: heightPercentage(8) }}
        placeholder="Username"
      ></TextInput>
      <TextInput
        className="bg-gray-200 text-2xl rounded-2xl mx-6 p-5"
        onChangeText={(value) => (passwordRef.current = value)}
        style={{ height: heightPercentage(8) }}
        placeholder="Password"
        secureTextEntry
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
      <>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <TouchableOpacity
            className="bg-purple-950 h-16 justify-center rounded-2xl mx-6"
            onPress={handleSignIn}
          >
            <Text className="text-white text-2xl text-center">Sign In</Text>
          </TouchableOpacity>
        )}
      </>
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
