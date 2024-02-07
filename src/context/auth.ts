import {createContext} from "react";

interface AuthContext {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext>({isAuthenticated: false})
