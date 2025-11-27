"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  sub: string;
  role: "LIBRARIAN" | "USER";
  iat: number;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  user: UserPayload | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLibrarian: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isLibrarian: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserPayload | null>(null);
  const router = useRouter();

  const handleToken = (newToken: string | null) => {
    if (newToken) {
      try {
        const decoded = jwtDecode<UserPayload>(newToken);
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired, logging out.");
          logout();
          return;
        }
        setToken(newToken);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token format", error);
        logout();
      }
    } else {
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleToken(savedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    handleToken(newToken);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  const isLibrarian = user?.role === "LIBRARIAN";

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isLibrarian,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
