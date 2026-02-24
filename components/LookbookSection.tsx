import Link from 'next/link';

const lookbookData = [
    {
        celebrity: "James Bond",
        movie: "Casino Royale",
    },
    {
        celebrity: "Don Draper",
        movie: "Mad Men",
    },
    {
        celebrity: "Tony Stark",
        movie: "Iron Man",
    },
    {
        celebrity: "Walter White",
        movie: "Breaking Bad",
    },
    {
        celebrity: "Neo",
        movie: "The Matrix",
    },
];

export default function LookbookSection() {
    return (
        <section className="py-8 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
                    Celebrity Lookbook
                </h2>
                {/* Description */}
                <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto text-sm md:text-base">
                    Get the exact looks worn by your favorite characters on screen
                </p>

                {/* Grid container: 2 columns on mobile, 4 on larger screens, cards resize with max width */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
                    {lookbookData.map((lookbook, index) => (
                        <Link key={index} href={`/lookbook/${index}`}>
                            <div className="w-full max-w-7xl mx-auto px-4 bg-slate-300 rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 transform transition-all">
                                {/* Placeholder for photo */}
                                <div className="text-center px-2">
                                    {/* Add a wrapper with max width and padding */}
                                    <div className="max-w-xs mx-auto px-4 py-2">
                                        <div className="text-slate-500 text-3xl md:text-6xl font-bold mb-1 md:mb-2">
                                            {lookbook.celebrity.charAt(0)}
                                        </div>
                                        <div className="text-slate-600 font-semibold text-xs md:text-base">
                                            {lookbook.celebrity}
                                        </div>
                                        <div className="text-slate-500 text-[10px] md:text-sm">
                                            {lookbook.movie}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
