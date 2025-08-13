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
    const [user, setUser] = useState<User | null>(() => {
        // Load current user from localStorage
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // Helper to save current user to state + localStorage
    const saveUser = (userData: User) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            setUser(null);
            localStorage.removeItem("user");
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
            if (!email || !password) throw new Error("Email and password required");

            // Load existing users
            const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

            // Check if email already exists
            if (users.find((u) => u.email === email)) {
                throw new Error("Email already registered");
            }

            const newUser: User = { email, fullName, username, phone };

            // Save new user to users array
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Log in immediately after registration
            saveUser(newUser);
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            if (!email || !password) throw new Error("Email and password required");

            // Load registered users
            const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

            const existingUser = users.find((u) => u.email === email);
            if (!existingUser) throw new Error("User not found");

            // Log in user
            saveUser(existingUser);
        } catch (err) {
            alert((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Force logout on back/forward navigation
    useEffect(() => {
        const handleBackOrForward = () => {
            if (user) {
                const confirmLogout = window.confirm("Are you sure you want to log out?");
                if (confirmLogout) {
                    setUser(null);
                    localStorage.removeItem("user");
                } else {
                    // ❌ Do nothing here — don't push a new history state
                    // This allows the back button to remain functional
                }
            }
        };

        window.addEventListener("popstate", handleBackOrForward);

        return () => {
            window.removeEventListener("popstate", handleBackOrForward);
        };
    }, [user]);


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
