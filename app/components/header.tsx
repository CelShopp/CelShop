import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        borderBottom: "1px solid white",
        flexWrap: "wrap"
      }}
    >
      <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
        CelebStore
      </Link>

      <nav
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "8px"
        }}
      >
        <Link href="/collections/batman">Batman</Link>
        <Link href="/collections/spiderman">Spider-Man</Link>
        <Link href="/">Guides</Link>
      </nav>
    </header>
  );
}