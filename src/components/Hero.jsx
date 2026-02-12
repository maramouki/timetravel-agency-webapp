import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const searchBarRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
        )
            .fromTo(searchBarRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.8'
            );
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-slate-950">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-time-gold/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 z-10 text-center">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Travel More, Worry Less
                </div>

                <h1 ref={titleRef} className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[1.1]">
                    Explore the <span className="text-time-gold italic">World</span>,<br />
                    One Journey at a Time.
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Our travel agency offers personalized and hassle-free travel experiences, tailored to meet your unique preferences and needs.
                </p>

                {/* Search Bar / Booking Bar */}
                <div ref={searchBarRef} className="max-w-4xl mx-auto bg-white rounded-3xl p-2 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-4">
                        <MapPin className="text-time-gold mr-3 h-5 w-5 shrink-0" />
                        <div className="text-left w-full">
                            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Location</label>
                            <input type="text" placeholder="Where to go?" className="text-slate-900 font-semibold focus:outline-none w-full bg-transparent placeholder:text-slate-300" />
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-4 font-sans">
                        <Calendar className="text-time-gold mr-3 h-5 w-5 shrink-0" />
                        <div className="text-left w-full">
                            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Check In</label>
                            <input type="date" className="text-slate-900 font-semibold focus:outline-none w-full bg-transparent cursor-pointer [color-scheme:light]" />
                        </div>
                    </div>

                    <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-4 font-sans">
                        <Users className="text-time-gold mr-3 h-5 w-5 shrink-0" />
                        <div className="text-left w-full">
                            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Participants</label>
                            <input type="number" min="1" placeholder="Add guests" className="text-slate-900 font-semibold focus:outline-none w-full bg-transparent placeholder:text-slate-300" />
                        </div>
                    </div>

                    <button className="bg-time-gold text-slate-950 px-8 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all transform active:scale-95 group">
                        <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        Search Properties
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
