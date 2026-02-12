import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationCard from './components/DestinationCard';
import Chatbot from './components/Chatbot';

gsap.registerPlugin(ScrollTrigger);

function App() {
    const mainRef = useRef(null);

    useEffect(() => {
        // Reveal sections on scroll
        const sections = gsap.utils.toArray('section');
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <div ref={mainRef} className="min-h-screen font-sans selection:bg-time-gold selection:text-slate-950">
            <Navbar />
            <main>
                <Hero id="home" />

                {/* Destination Gallery Section */}
                <section id="destinations" className="py-24 bg-slate-950">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Popular <span className="text-time-gold italic">Destinations</span></h2>
                                <p className="text-slate-400 max-w-xl">
                                    Discover the most breathtaking time periods and locations across history, curated for the modern traveler.
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                {/* Custom Navigation Arrows */}
                                <button className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-950 transition active:scale-90">←</button>
                                <button className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-950 transition active:scale-90">→</button>
                            </div>
                        </div>

                        {/* Destination Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <DestinationCard
                                title="Paris 1889"
                                category="Belle Époque"
                                date="May 1889 - Oct 1889"
                                image="/images/paris-1889.png"
                                price="$890.00"
                            />
                            <DestinationCard
                                title="The Cretaceous"
                                category="Prehistory"
                                date="65M BC - Pre-Impact"
                                image="/images/cretaceous.png"
                                price="$1,250.00"
                            />
                            <DestinationCard
                                title="Florence 1504"
                                category="Renaissance"
                                date="May 1504 - Aug 1504"
                                image="/images/florence-1504.png"
                                price="$940.00"
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 border-y border-slate-900">
                    <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'Years of History', value: '234M' },
                            { label: 'Active Travelers', value: '768K' },
                            { label: 'Customer Rating', value: '5.0★' },
                            { label: 'Annual Bookings', value: '$8.8B' },
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <div className="text-5xl font-serif font-bold text-time-gold mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Client Review Section */}
                <section className="py-24 bg-slate-950">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="text-time-gold mb-8 flex justify-center space-x-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="text-2xl">★</span>
                            ))}
                        </div>
                        <blockquote className="text-3xl md:text-4xl font-serif italic mb-12 leading-relaxed">
                            "Working with this agency was a pleasure. They understood our vision and helped us find a property (time-era) that exceeded our expectations. We couldn't have done it without them!"
                        </blockquote>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-slate-800 mb-4 overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=leo" alt="Client" />
                            </div>
                            <div className="font-bold text-white">Sajibur Rahman</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">UI/UX Designer & Time Traveler</div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 border-t border-slate-900">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-serif font-bold mb-12 text-center text-white">Frequently Asked <span className="text-time-gold">Questions</span></h2>
                        <div className="space-y-6">
                            {[
                                { q: "How do I book a trip with your agency?", a: "Simply reach out via our website, phone, or email. Share your travel preferences, and we'll create a personalized itinerary for you." },
                                { q: "Can I customize my travel package?", a: "Absolutely! We specialize in creating custom-tailored travel experiences. Let us know your requirements and we'll handle the rest." },
                                { q: "Do you offer travel insurance?", a: "Yes, we provide comprehensive travel insurance that covers all historical eras, including dinosaur-related incidents." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                                    <h3 className="font-bold text-lg mb-2 text-white">{faq.q}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <footer className="py-12 border-t border-slate-900">
                <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
                    © 2026 TimeTravel Agency. All rights reserved.
                </div>
            </footer>
            <Chatbot />
        </div>
    );
}

export default App;
