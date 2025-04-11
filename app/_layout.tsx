import { Slot, useRouter, useSegments } from "expo-router";
import "./globals.css";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { useEffect } from "react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") {
      return;
    }
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (!isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
