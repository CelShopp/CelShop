import Link from 'next/link';
import { Camera } from 'lucide-react';

const lookbookData = [
    {
        celebrity: "James Bond",
        movie: "Casino Royale",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    },
    {
        celebrity: "Don Draper",
        movie: "Mad Men",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        celebrity: "Tony Stark",
        movie: "Iron Man",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    },
    {
        celebrity: "Thomas Shelby",
        movie: "Peaky Blinders",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    },
];

export default function LookbookSection() {
    return (
        <section className="py-24 px-6 md:px-12 bg-stone-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-stone-900 tracking-tight leading-none">
                            Celebrity <br className="hidden md:block" /><span className="text-orange-600">Lookbook</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lookbookData.map((lookbook, index) => (
                        <Link key={index} href={`/lookbook/${index}`} className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            {/* Image Background */}
                            <img
                                src={lookbook.image}
                                alt={lookbook.celebrity}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="text-white font-black text-2xl mb-1">{lookbook.celebrity}</div>
                                    <div className="text-white/60 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Seen in {lookbook.movie}
                                    </div>
                                </div>
                                <div className="mt-4 w-12 h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

