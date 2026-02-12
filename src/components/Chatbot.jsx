import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { gsap } from 'gsap';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        console.log("Current Deployment Commit: 2c4e3e3");
    }, []);

    // Vercel AI SDK hook with System Prompt
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
        onError: (err) => {
            console.error("AI Error:", err);
        },
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Bienvenue chez TimeTravel Agency ! Je suis votre guide expert en époques révolues. Que vous soyez attiré par l'élégance de la Belle Époque à paris, les frissons du Crétacé ou le génie de la Renaissance à Florence, je suis là pour tracer votre itinéraire temporel. Quelle destination vous fait rêver aujourd'hui ?"
            }
        ],
        body: {
            systemPrompt: `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
            Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
            Ton ton : Professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste sans être trop familier.
            Détails des destinations :
            - Paris 1889 : Belle Époque, Tour Eiffel, Exposition Universelle, élégance.
            - Crétacé -65M : Dinosaures, nature sauvage, aventure, survie (encadrée).
            - Florence 1504 : Renaissance, art, Michel-Ange, Léonard de Vinci.
            Réponds toujours avec cette expertise.`
        }
    });

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(chatWindowRef.current,
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div
                    ref={chatWindowRef}
                    className="absolute bottom-20 right-0 w-[380px] h-[500px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-time-gold/10 flex items-center justify-center border border-time-gold/30">
                                    <Bot className="text-time-gold h-5 w-5" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" title="AI Online" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Time Assistant</div>
                                <div className="text-[10px] text-time-gold font-bold uppercase tracking-widest flex items-center">
                                    Historical Expert
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-500 hover:text-white transition"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
                    >
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                    ? 'bg-time-gold text-slate-950 font-medium rounded-tr-none'
                                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
                                    }`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center space-x-2 border border-white/5">
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-time-gold rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 bg-time-gold rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 bg-time-gold rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert is typing...</span>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="flex justify-center">
                                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-500 text-[10px] uppercase font-bold tracking-widest">
                                    Connexion interrompue
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
                    >
                        <input
                            value={input}
                            onChange={handleInputChange}
                            className="flex-1 bg-slate-800 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-time-gold transition border border-transparent placeholder:text-slate-500"
                            placeholder="Ask about your journey..."
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="bg-time-gold text-slate-950 p-3 rounded-xl hover:bg-white transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform ${isOpen ? 'bg-slate-800 rotate-90 scale-90' : 'bg-time-gold rotate-0 scale-100'
                    } hover:scale-110 active:scale-90`}
            >
                {isOpen ? (
                    <X className="text-white h-8 w-8" />
                ) : (
                    <MessageSquare className="text-slate-950 h-8 w-8" />
                )}

                {/* Glow Effect */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full bg-time-gold blur-[15px] opacity-40 animate-pulse -z-10" />
                )}
            </button>
        </div>
    );
};

export default Chatbot;
