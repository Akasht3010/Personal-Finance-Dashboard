import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, user } = useAuth();
    const navigate = useNavigate();

    // 🔹 Redirect to dashboard after successful login
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="auth-page">
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl">💰</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                            <p className="text-slate-600">Sign in to your account to continue</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-slate-400">📧</span>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-slate-400">🔒</span>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-slate-50 focus:bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Logging in...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <span className="mr-2">🚀</span>
                                        Sign In
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-slate-500">New to our platform?</span>
                                </div>
                            </div>
                        </div>

                        {/* Switch to Register */}
                        <div className="text-center">
                            <p className="text-slate-600 mb-4">
                                Don't have an account yet?
                            </p>
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 border border-slate-300 hover:border-slate-400"
                            >
                                Create New Account
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                            <p className="text-xs text-slate-500">
                                By signing in, you agree to our{" "}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 text-center">
                        <p className="text-sm text-slate-600">
                            <span className="font-medium">🎯 Pro Tip:</span> Keep your financial data secure and never share your login credentials
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;