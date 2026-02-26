import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState({ Email: "", Pass: "" });
    const [error, setError] = useState(""); // Error message dikhane ke liye

    const handleLogin = (e) => {
        e.preventDefault();

        // 1. Local Storage se Signup wala data nikalo
        const savedData = localStorage.getItem("user");

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            // 2. Match Email and Password (Signup wala vs Current Input)
            // Note: Signup mein field names email aur password hain
            if (parsedData.email === UserData.Email && parsedData.password === UserData.Pass) {
                setIsLoggedIn(true);
                setError("");
                navigate('/');
            } else {
                setError("Invalid Email or Password! ❌");
            }
        } else {
            setError("No account found! Please Sign Up first. ⚠️");
        }
    };

    return (
        <div id='bg' className="h-screen w-full flex items-center justify-center px-6">
            <div className="absolute w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-light text-white uppercase tracking-tighter mb-8 text-center">
                    Welcome <span className="opacity-30 italic">Back</span>
                </h2>

                {/* Error Message Display */}
                {error && (
                    <p className="text-red-400 text-xs text-center mb-4 tracking-widest uppercase animate-pulse">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            value={UserData.Email}
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all"
                            required
                            onChange={(e) => setUserData(prev => ({ ...prev, Email: e.target.value }))}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={UserData.Pass}
                            placeholder="PASSWORD"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all"
                            required
                            onChange={(e) => setUserData(prev => ({ ...prev, Pass: e.target.value }))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-tighter hover:bg-gray-200 transition-all active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-white/40 text-center mt-8 text-xs tracking-widest uppercase">
                    Don't have an account?
                    <span onClick={() => navigate('/signup')} className="text-white cursor-pointer ml-2 hover:underline">Register</span>
                </p>
            </div>
        </div>
    );
};

export default Login;