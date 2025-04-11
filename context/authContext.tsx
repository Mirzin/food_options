import { auth, db } from "@/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState, createContext, useContext, Context } from "react";
import { AuthProps } from "@/interfaces/interface";

let AuthContext: Context<AuthProps>;

const STORAGE_KEY = "@food_options_firebase_user";

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
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
      setUsername(username);
      return { success: true, data: response.user };
    } catch (e: any) {
      let errorMessage: String = e.message;
      errorMessage = errorMessage.replace("Firebase: ", "");
      errorMessage = errorMessage.replace("auth/", "");
      errorMessage = errorMessage.replace(
        "missing-email",
        "Username Not Found"
      );
      return { success: false, msg: errorMessage };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUsername("");
  };

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
        email: email,
      });
      setUsername(username);
      return { success: true, data: response.user };
    } catch (e: any) {
      let errorMessage: String = e.message;
      errorMessage = errorMessage.replace("Firebase: ", "");
      errorMessage = errorMessage.replace("auth/", "");
      return { success: false, msg: errorMessage };
    }
  };

  AuthContext = createContext<AuthProps>({
    username,
    user,
    isAuthenticated,
    login,
    register,
    logout,
  });

  return (
    <AuthContext.Provider
      value={{
        username,
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
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
