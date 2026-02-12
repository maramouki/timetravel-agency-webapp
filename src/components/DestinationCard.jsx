import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const DestinationCard = ({ title, category, date, image, price }) => {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 aspect-[3/4] cursor-pointer transition-all duration-500 hover:border-time-gold/50 shadow-lg hover:shadow-time-gold/10">
            {/* Image Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 p-8 z-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="text-[10px] font-bold text-time-gold uppercase tracking-[0.2em] mb-2">{category}</div>
                        <h3 className="text-2xl font-serif font-bold text-white leading-tight">{title}</h3>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 px-3 border border-white/10">
                        <div className="text-[10px] text-white/60 uppercase font-bold text-center">From</div>
                        <div className="text-sm font-bold text-white">{price}</div>
                    </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-300 mb-6">
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-3.5 w-3.5 text-time-gold" />
                        <span>{date}</span>
                    </div>
                </div>

                <button className="w-full bg-white text-slate-950 py-3 rounded-xl font-bold text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 active:scale-95">
                    Plan Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default DestinationCard;
