import { auth, db } from "@/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState, createContext, useContext, Context } from "react";

interface AuthResponse {
  success: boolean;
  msg?: any;
  data?: any;
}

interface AuthProps {
  user: any;
  isAuthenticated?: any;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => {};
}

let AuthContext: Context<AuthProps>;

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", username));
      const userEmail = userDoc.data()?.email;
      const response = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      return { success: true, data: response.user };
    } catch (e: any) {
      let errorMessage: String = e.message;
      errorMessage = errorMessage.replace("Firebase: ", "");
      errorMessage = errorMessage.replace("auth/", "");
      errorMessage = errorMessage.replace("missing-email", "Username Not Found");
      return { success: false, msg: errorMessage };
    }
  };

  const logout = async () => {};

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response?.user);
      await setDoc(doc(db, "users", username), {
        username,
        userId: response.user.uid,
        email: email,
      });
      return { success: true, data: response.user };
    } catch (e: any) {
      let errorMessage: String = e.message;
      errorMessage = errorMessage.replace("Firebase: ", "");
      errorMessage = errorMessage.replace("auth/", "");
      return { success: false, msg: errorMessage };
    }
  };

  AuthContext = createContext<AuthProps>({
    user,
    isAuthenticated,
    login,
    register,
    logout,
  });

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
