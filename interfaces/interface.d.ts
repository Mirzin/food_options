import { User } from "firebase/auth";

export type MealType = "breakfast" | "lunch" | "dinner";

export type Meals = {
  [key in MealType]: Food[];
};

interface Food {
  name: string;
  ingredients?: string[];
  timeToPrepare: number;
}

interface AuthResponse {
  success: boolean;
  msg?: any;
  data?: any;
}

interface AuthProps {
  user: User | null;
  isAuthenticated?: any;
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  logout: () => {};
}
