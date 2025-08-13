import React, { createContext, useContext, useState } from "react";

interface User {
  email: string;
  fullName?: string;
  username?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName?: string,
    username?: string,
    phone?: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // ✅ Initialize from localStorage if exists
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const confirmLogout = () => window.confirm("Are you sure you want to log out?");

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    await new Promise((res) => setTimeout(res, 1000));
    if (!email || !password) throw new Error("Email and password required");

    // Get registered users
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    // Find the user by email
    const existingUser = users.find((u) => u.email === email);
    if (!existingUser) throw new Error("User not found");

    // Log in
    setUser(existingUser);
    localStorage.setItem("user", JSON.stringify(existingUser));
  } catch (err) {
    alert((err as Error).message);
  } finally {
    setLoading(false);
  }
};


  const register = async (
  email: string,
  password: string,
  fullName?: string,
  username?: string,
  phone?: string
) => {
  setLoading(true);
  try {
    await new Promise((res) => setTimeout(res, 1000));
    if (!email || !password) throw new Error("Email and password required");

    const newUser: User = { email, fullName, username, phone };

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

    // Save new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Log in immediately after registration
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  } catch (err) {
    alert((err as Error).message);
  } finally {
    setLoading(false);
  }
};


  const logout = () => {
    if (confirmLogout()) {
      setUser(null);
      localStorage.removeItem("user"); // ✅ remove from storage on logout
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
