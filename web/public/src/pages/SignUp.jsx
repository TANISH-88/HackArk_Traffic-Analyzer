import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsLoggedIn }) => { // Prop pass karein taaki status update ho sake
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const handleSignup = (e) => {
        e.preventDefault();

        // 1. Local Storage mein "user" key se save karna (Login synchronization ke liye)
        // Data store karna
        localStorage.setItem("user", JSON.stringify(formData));

        // 2. Ab ye error nahi dega kyunki App.jsx se function aa raha hai
        if (typeof setIsLoggedIn === 'function') {
            setIsLoggedIn(true);
        }

        console.log("User Registered & Logged In:", formData);

        // 3. Signup ke baad direct Home/Predict par redirect
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div id='bg' className="h-screen w-full flex items-center justify-center px-6">
            <div className="absolute w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-light text-white uppercase tracking-tighter mb-8 text-center">
                    Join the <span className="opacity-30 italic">Future</span>
                </h2>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="FULL NAME"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="CREATE PASSWORD"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-white/40 transition-all"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-tighter hover:bg-gray-200 transition-all active:scale-95 mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-white/40 text-center mt-8 text-xs tracking-widest uppercase">
                    Already a member?
                    <span onClick={() => navigate('/login')} className="text-white cursor-pointer ml-2 hover:underline">Login</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;