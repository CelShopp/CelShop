"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-stone-900 border border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex-shrink-0 flex items-center justify-center text-orange-500">
                        <Sparkles size={24} />
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-1">Archive Integrity</h3>
                        <p className="text-stone-400 text-xs font-medium leading-relaxed">
                            We use cookies to improve your cinematic experience and track affiliate performance. By browsing, you agree to our <Link href="/privacy" className="text-white hover:text-orange-500 underline underline-offset-4">Privacy Policy</Link>.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={acceptCookies}
                            className="flex-grow md:flex-grow-0 px-8 py-4 bg-white text-stone-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:text-white transition-all active:scale-95"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-4 bg-white/5 text-stone-400 rounded-2xl hover:bg-white/10 transition-all hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
