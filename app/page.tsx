import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Movie Outfits & Celebrity Inspired Clothing",
  description:
    "Find movie inspired outfits, celebrity clothing and budget alternatives to iconic movie looks like Batman, Spider-Man and more.",
};

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Shop Movie Inspired Outfits</h1>

      <div>
        <h2>Collections</h2>

        <Link href="/collections/batman">
          Batman Outfits
        </Link>

         <br />

        <Link href="/collections/spiderman">Spiderman Outfits</Link>


      </div>
      <div>
       <h2>Guides</h2>

       <Link href="/blog/batman-outfit-guide">
         How to Dress Like Batman
       </Link>
      </div>
    </main>
  );
}
