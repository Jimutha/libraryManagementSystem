"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface UserPayload {
  sub: string; // The email (subject)
  role: "LIBRARIAN" | "USER"; // The role claim
  iat: number; // Issued At
  exp: number; // Expiration Time
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

  // Helper function to decode the token and update state
  const handleToken = (newToken: string | null) => {
    if (newToken) {
      try {
        const decoded = jwtDecode<UserPayload>(newToken);

        // Check if token is expired (exp is in seconds, Date.now() is in ms)
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired, logging out.");
          logout(); // Clear everything if expired
          return;
        }

        // Valid token: Set state
        setToken(newToken);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token format", error);
        logout(); // Clear corrupted token
      }
    } else {
      // No token provided: Clear state
      setToken(null);
      setUser(null);
    }
  };

  // On app load: Check for existing token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      handleToken(savedToken);
    }
  }, []);

  // Login function: Save token and redirect
  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    handleToken(newToken);
    router.push("/");
  };

  // Logout function: Clear token and redirect
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  // Derived state: Check if user role matches "LIBRARIAN"
  // Note: This depends on your backend JwtService adding the "role" claim!
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
