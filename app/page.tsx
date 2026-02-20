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

       <br />

       <Link href="/blog/batman-costume-guide">
       Best Batman Costume Pieces
       </Link>

       <br />

       <Link href="/blog/spiderman-outfit-guide">
        How to Dress Like Spider-Man
       </Link>

       <br />

       <Link href="/blog/spiderman-costume-guide">
       Best Spider-Man Costume Pieces
       </Link>

       <br />

       <Link href="/blog/best-batman-jacket-vs-budget">
       Best Batman Jacket: Budget vs Premium
       </Link>

       <br />

       <Link href="/blog/best-batman-jacket-vs-budget">
       Best Batman Jacket: Budget vs Premium
       </Link>

       <br />

       <Link href="/blog/best-batman-mask-vs-budget">
       Best Batman Mask: Budget vs Premium
       </Link>

       <br />

       <Link href="/blog/best-spiderman-hoodie-vs-budget">
       Best Spider-Man Hoodie: Budget vs Premium
       </Link>




      </div>
    </main>
  );
}
