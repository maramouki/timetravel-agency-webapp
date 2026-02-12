import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { gsap } from 'gsap';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const chatWindowRef = useRef(null);

    // Vercel AI SDK hook
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: '/api/chat',
        onError: (err) => {
            console.error("CRITICAL AI ERROR:", err);
        },
        initialMessages: [
            {
                id: 'welcome-init',
                role: 'assistant',
                content: "Bienvenue chez TimeTravel Agency ! Je suis votre guide expert en époques révolues. Quelle destination vous fait rêver aujourd'hui ?"
            }
        ],
        body: {
            systemPrompt: "Tu es un guide expert temporel. Ton ton est professionnel et passionné."
        }
    });

    const chatContainerRef = useRef(null);

    // Ultra Debugging & Network Check
    useEffect(() => {
        console.log("=== CHATBOT DEBUG ULTRA ===");
        console.log("Status: Checking API...");
        fetch('/api/chat', { method: 'GET' }).then(r => {
            console.log("API Reachable (GET test):", r.status !== 404);
        }).catch(e => console.log("API Unreachable:", e));

        console.log("Deployment: v-ultra-stable");
        console.log("Messages List:", messages);
        console.log("Messages Length:", messages?.length);
        console.log("Input State:", input === '' ? 'Empty String' : typeof input);
        console.log("============================");
    }, [messages, input]);

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

    // Force display logic
    const finalMessages = (messages && messages.length > 0) ? messages : [
        {
            id: 'fallback-fixed',
            role: 'assistant',
            content: "Bienvenue chez TimeTravel Agency ! Je suis votre guide expert. Comment puis-je vous aider à explorer le temps ?"
        }
    ];

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
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
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
                        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-slate-900/50"
                    >
                        {finalMessages.map((m) => (
                            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                    ? 'bg-time-gold text-slate-950 font-medium rounded-tr-none'
                                    : 'bg-slate-800 text-white rounded-tl-none border border-white/5 shadow-md'
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
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert explore le temps...</span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="flex justify-center p-2">
                                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">
                                    Erreur de connexion : {error.message.includes('500') ? 'Clé API absente' : 'Réseau instable'}
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
                            className="flex-1 bg-slate-800 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-time-gold transition border border-transparent placeholder:text-slate-500 outline-none"
                            placeholder="Interrogez le temps..."
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input || !input.trim()}
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
