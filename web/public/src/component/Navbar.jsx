import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => { // State as props
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Logout Function
    const handleLogout = () => {
        setIsLoggedIn(false); // State update taki UI change ho jaye
        navigate('/login'); // Redirect to login
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-16 
            ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'}`}
        >
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="text-white text-2xl font-semibold tracking-tighter italic cursor-pointer group"
                >
                    Hack<span className="group-hover:text-blue-400 transition-colors">Ark</span>
                </div>

                {/* Navigation Section */}
                <div className="hidden md:flex items-center gap-10">
                    <button
                        onClick={() => navigate('/')}
                        className="text-white/60 cursor-pointer hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-bold relative group"
                    >
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                    </button>

                    <button
                        onClick={() => navigate('/about')}
                        className="text-white/60 cursor-pointer hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-bold relative group"
                    >
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </button>

                    {/* Conditional Predict Button - Ab ye Navigation section ka part hai */}
                    {isLoggedIn && (
                        <button
                            onClick={() => navigate('/predict')}
                            className="text-blue-400 cursor-pointer hover:text-blue-300 transition-all text-xs uppercase tracking-[0.2em] font-bold border border-blue-400/30 px-6 py-2 rounded-full hover:bg-blue-400/10 active:scale-95"
                        >
                            Predict
                        </button>
                    )}
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-8">
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-white/70 cursor-pointer hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-bold"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => navigate('/signup')}
                                className="bg-white cursor-pointer text-black px-7 py-2.5 rounded-full text-xs font-bold hover:bg-gray-200 transition-all uppercase tracking-tighter active:scale-95 shadow-lg"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        // LOGOUT Button - Visible only when logged in
                        <button
                            onClick={handleLogout}
                            className="text-white/40 cursor-pointer hover:text-red-500 transition-all text-xs uppercase font-bold tracking-[0.2em] border border-white/10 hover:border-red-500/50 px-5 py-2 rounded-full"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;