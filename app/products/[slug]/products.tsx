import { useRouter } from 'next/router';

const lookbookData = [
  {
    celebrity: "James Bond",
    movie: "Casino Royale",
    items: [
      { name: "Navy Suit", color: "#1e3a8a" },
      { name: "White Shirt", color: "#ffffff" },
      { name: "Black Tie", color: "#000000" },
      { name: "Oxford Shoes", color: "#b45309" },
    ],
  },
  {
    celebrity: "Don Draper",
    movie: "Mad Men",
    items: [
      { name: "Grey Suit", color: "#6b7280" },
      { name: "Light Blue Shirt", color: "#bae6fd" },
      { name: "Striped Tie", color: "#334155" },
      { name: "Brown Oxford", color: "#92400e" },
    ],
  },
  {
    celebrity: "Tony Stark",
    movie: "Iron Man",
    items: [
      { name: "Black Blazer", color: "#0f172a" },
      { name: "Graphic Tee", color: "#dc2626" },
      { name: "Dark Jeans", color: "#1e3a8a" },
      { name: "Sneakers", color: "#d1d5db" },
    ],
  },
  {
    celebrity: "Walter White",
    movie: "Breaking Bad",
    items: [
      { name: "Green Shirt", color: "#16a34a" },
      { name: "Beige Pants", color: "#fef3c7" },
      { name: "White Briefs", color: "#ffffff" },
      { name: "Socks", color: "#27272a" },
    ],
  },
  {
    celebrity: "Neo",
    movie: "The Matrix",
    items: [
      { name: "Black Coat", color: "#000000" },
      { name: "Black Shirt", color: "#0f172a" },
      { name: "Black Pants", color: "#1f2937" },
      { name: "Black Boots", color: "#4b5563" },
    ],
  },
];

export default function LookbookDetail() {
  const router = useRouter();
  const { id } = router.query; // get the ID from URL

  const lookbookIndex = parseInt(id as string); // convert string to number
  const lookbook = lookbookData[lookbookIndex]; // get data

  if (!lookbook) return <div>Loading...</div>; // handle if data not found

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Photo on the left */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <div
          style={{
            width: '100%',
            paddingTop: '75%',
            backgroundColor: '#ccc',
            position: 'relative',
            borderRadius: '8px',
          }}
        >
          {/* Placeholder for the photo */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            {lookbook.celebrity}
          </div>
        </div>
      </div>

      {/* Clothing items */}
      <div style={{ flex: 1 }}>
        {lookbook.items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            {/* Color box */}
            <div
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: item.color,
                borderRadius: '4px',
              }}
            ></div>
            {/* Item name and button */}
            <div style={{ marginLeft: '15px', flex: 1 }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <button
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#3490dc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                See Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}