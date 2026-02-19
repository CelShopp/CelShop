import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Shop Movie Outfits</h1>

      <div>
        <h2>Collections</h2>

        <Link href="/collections/batman">
          Batman Outfits
        </Link>
        <Link href="/collections/spiderman">Spiderman Outfits</Link>


      </div>
    </main>
  );
}
