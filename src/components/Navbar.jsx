import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full px-6 py-4 flex justify-between items-center z-50 transition-all duration-300">
            <div className="flex items-center space-x-2">
                <div className="text-2xl font-serif font-bold text-time-gold tracking-tight">Malvora</div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-widest text-slate-300">
                <a href="#home" className="hover:text-time-gold transition-colors">Home</a>
                <a href="#destinations" className="hover:text-time-gold transition-colors">Destinations</a>
                <a href="#about" className="hover:text-time-gold transition-colors">About Us</a>
                <a href="#contact" className="hover:text-time-gold transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
                <button className="text-slate-300 hover:text-white transition">Log in</button>
                <button className="bg-time-gold text-slate-950 px-6 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-white transition-all transform hover:scale-105 active:scale-95">
                    Sign Up
                </button>
            </div>
        </header>
    );
};

export default Navbar;
