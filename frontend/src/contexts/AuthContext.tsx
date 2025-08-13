import React, { createContext, useContext, useState, useEffect } from "react";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmLogout = () => {
    return window.confirm("Are you sure you want to log out?");
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1000));

      // Simple validation (replace with real auth later)
      if (!email || !password) throw new Error("Email and password required");

      setUser({ email });
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

      setUser({ email, fullName, username, phone });
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (confirmLogout()) {
      setUser(null);
    }
  };

  // 🛡 Logout on Back / Page Restore with confirmation
  useEffect(() => {
    const handleBackOrRestore = (event: Event) => {
      if (confirmLogout()) {
        setUser(null);
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handleBackOrRestore);
    window.addEventListener("pageshow", (event) => {
      if ((event as PageTransitionEvent).persisted) {
        handleBackOrRestore(event);
      }
    });

    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handleBackOrRestore);
    };
  }, []);

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
