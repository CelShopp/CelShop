"use client";

import React, { useState } from "react";
import { Plus, Package, Sparkles } from "lucide-react";

export default function AddActorBreakdown() {
  if (process.env.NODE_ENV !== "development") return null;

  const [actorFile, setActorFile] = useState<File | null>(null);
  const [actorPreview, setActorPreview] = useState<string | null>(null);

  const [actorData, setActorData] = useState({
    actorName: "",
    movie: "",
    slug: "",
  });

  const [products, setProducts] = useState<any[]>([
    {
      name: "",
      slug: "",
      description: "",
      price: "",
      buyLink: "",
      image: "",
      file: null,
      preview: null,
    },
  ]);

  const autoSlug = (val: string) =>
    val.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        slug: "",
        description: "",
        price: "",
        buyLink: "",
        image: "",
        file: null,
        preview: null,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload actor image
    let actorImageUrl = "";
    if (actorFile) {
      const data = new FormData();
      data.append("file", actorFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      actorImageUrl = result.url;
    }
    if (!actorImageUrl) {
  alert("Actor image missing");
  return;
}

    // Upload each product image
    const formattedProducts = [];

    for (const product of products) {
      let imageUrl = product.image;

      if (product.file) {
        const data = new FormData();
        data.append("file", product.file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });

        const result = await res.json();
        imageUrl = result.url;
      }

      formattedProducts.push({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: parseInt(product.price),
        buyLink: product.buyLink,
        image: imageUrl,
        collection: "lookbook",
      });
    }

    await fetch("/api/actorlooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...actorData,
        image: actorImageUrl,
        products: formattedProducts,
      }),
    });

    alert("Look Created");
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24">
      <main className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-black mb-12">
          Create Actor Breakdown
        </h1>

        <form onSubmit={handleSubmit} className="space-y-12">

          {/* ACTOR SECTION */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl space-y-6">

            <h2 className="text-2xl font-bold">Actor Section</h2>

            <input
              placeholder="Actor Name"
              value={actorData.actorName}
              onChange={(e) =>
                setActorData({
                  ...actorData,
                  actorName: e.target.value,
                  slug: autoSlug(e.target.value + "-" + actorData.movie),
                })
              }
              className="w-full p-4 bg-stone-50 rounded-2xl"
            />

            <input
              placeholder="Movie"
              value={actorData.movie}
              onChange={(e) =>
                setActorData({
                  ...actorData,
                  movie: e.target.value,
                  slug: autoSlug(actorData.actorName + "-" + e.target.value),
                })
              }
              className="w-full p-4 bg-stone-50 rounded-2xl"
            />

            <input
              placeholder="Slug"
              value={actorData.slug}
              onChange={(e) =>
                setActorData({
                  ...actorData,
                  slug: autoSlug(e.target.value),
                })
              }
              className="w-full p-4 bg-stone-50 rounded-2xl"
            />

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setActorFile(e.target.files[0]);
                  setActorPreview(
                    URL.createObjectURL(e.target.files[0])
                  );
                }
              }}
            />

            {actorPreview && (
              <img
                src={actorPreview}
                className="w-full h-72 object-cover rounded-2xl"
              />
            )}
          </div>

          {/* PRODUCTS SECTION */}
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-[3rem] p-10 shadow-xl space-y-6"
            >
              <h2 className="text-2xl font-bold">
                Product #{index + 1}
              </h2>

              <input
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => {
                  const copy = [...products];
                  copy[index].name = e.target.value;
                  copy[index].slug = autoSlug(e.target.value);
                  setProducts(copy);
                }}
                className="w-full p-4 bg-stone-50 rounded-2xl"
              />

              <textarea
                placeholder="Description"
                value={product.description}
                onChange={(e) => {
                  const copy = [...products];
                  copy[index].description = e.target.value;
                  setProducts(copy);
                }}
                className="w-full p-4 bg-stone-50 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => {
                  const copy = [...products];
                  copy[index].price = e.target.value;
                  setProducts(copy);
                }}
                className="w-full p-4 bg-stone-50 rounded-2xl"
              />

              <input
                placeholder="Amazon Link"
                value={product.buyLink}
                onChange={(e) => {
                  const copy = [...products];
                  copy[index].buyLink = e.target.value;
                  setProducts(copy);
                }}
                className="w-full p-4 bg-stone-50 rounded-2xl"
              />

              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    const copy = [...products];
                    copy[index].file = e.target.files[0];
                    copy[index].preview =
                      URL.createObjectURL(e.target.files[0]);
                    setProducts(copy);
                  }
                }}
              />

              {product.preview && (
                <img
                  src={product.preview}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addProduct}
            className="px-6 py-3 bg-stone-200 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Another Product
          </button>

          <button
            type="submit"
            className="w-full py-6 bg-stone-900 text-white font-black rounded-2xl"
          >
            <Package size={20} className="inline mr-2" />
            Publish Breakdown
          </button>

        </form>
      </main>
    </div>
  );
}