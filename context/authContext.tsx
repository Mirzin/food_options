import { useEffect, useState, createContext, useContext } from "react";

interface AuthProps {
  user?: any;
  isAuthenticated?: any;
  login?: (username: string, password: string) => Promise<void>;
  register?: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout?: () => Promise<void>;
}

export const AuthContext = createContext<AuthProps>({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    //On Auth State change
  }, []);

  const login = async (username: string, password: string) => {};

  const logout = async () => {};

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {};

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
