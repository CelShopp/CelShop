import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

const collections = [
    { name: "Denim Collection", color: "bg-blue-600" },
    { name: "Leather Jackets", color: "bg-amber-700" },
    { name: "Vintage Tees", color: "bg-slate-600" },
    { name: "Formal Wear", color: "bg-gray-800" },
];

export default function CollectionsGrid() {
    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
                    Featured Collections
                </h2>

                {/* Collections Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {collections.map((collection, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className={`aspect-[3/4] ${collection.color} flex items-center justify-center`}>
                                <div className="text-white/20 text-4xl font-bold">{collection.name.charAt(0)}</div>
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                                <div className="p-4 w-full">
                                    <h3 className="text-white font-semibold text-lg">{collection.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button - Mobile Only */}
                <div className="flex justify-center md:hidden">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-md flex items-center gap-2">
                        See More
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
