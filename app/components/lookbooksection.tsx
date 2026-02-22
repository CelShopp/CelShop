const lookbookData = [
  {
    celebrity: "James Bond",
    movie: "Casino Royale",
    items: [
      { name: "Navy Suit", color: "bg-blue-900" },
      { name: "White Shirt", color: "bg-white border border-gray-200" },
      { name: "Black Tie", color: "bg-black" },
      { name: "Oxford Shoes", color: "bg-amber-800" },
    ],
  },
  {
    celebrity: "Don Draper",
    movie: "Mad Men",
    items: [
      { name: "Grey Suit", color: "bg-gray-500" },
      { name: "Light Blue Shirt", color: "bg-sky-200" },
      { name: "Striped Tie", color: "bg-slate-700" },
      { name: "Brown Oxford", color: "bg-amber-700" },
    ],
  },
  {
    celebrity: "Tony Stark",
    movie: "Iron Man",
    items: [
      { name: "Black Blazer", color: "bg-slate-900" },
      { name: "Graphic Tee", color: "bg-red-600" },
      { name: "Dark Jeans", color: "bg-blue-800" },
      { name: "Sneakers", color: "bg-gray-300" },
    ],
  },
  {
    celebrity: "Walter White",
    movie: "Breaking Bad",
    items: [
      { name: "Green Shirt", color: "bg-green-600" },
      { name: "Beige Pants", color: "bg-amber-100" },
      { name: "White Briefs", color: "bg-white border border-gray-200" },
      { name: "Socks", color: "bg-gray-800" },
    ],
  },
  {
    celebrity: "Neo",
    movie: "The Matrix",
    items: [
      { name: "Black Coat", color: "bg-black" },
      { name: "Black Shirt", color: "bg-slate-900" },
      { name: "Black Pants", color: "bg-gray-900" },
      { name: "Black Boots", color: "bg-zinc-800" },
    ],
  },
];

export default function LookbookSection() {
  return (
    <section className="py-8 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
          Celebrity Lookbook
        </h2>
        <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto text-sm md:text-base">
          Get the exact looks worn by your favorite characters on screen
        </p>

        {lookbookData.map((lookbook, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-4 md:gap-8 py-6 md:py-12 border-b border-gray-200 last:border-0"
          >
            {/* Celebrity Photo */}
            <div className="w-1/2">
              <div className="aspect-[4/3] bg-slate-300 rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                <div className="text-center px-2">
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

            {/* Clothing Items Grid */}
            <div className="w-1/2">
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {lookbook.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href="https://amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div
                      className={`aspect-[3/4] ${item.color} rounded-md shadow-sm hover:shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center justify-center`}
                    >
                      <div className="text-white/30 text-lg md:text-2xl font-bold">
                        {item.name.charAt(0)}
                      </div>
                    </div>
                    <p className="text-slate-700 text-[10px] md:text-sm mt-1 md:mt-2 font-medium group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}