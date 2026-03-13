"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, Edit2, ImageIcon, Plus, Search, Trash2, Upload, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  collection: string;
};

type Outfit = {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string | null;
  productIds: string[];
  updatedAt: string;
};

export default function AdminOutfitsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
  const [productQuery, setProductQuery] = useState("");

  useEffect(() => {
    const authCookie =
      typeof document !== "undefined"
        ? document.cookie.split("; ").find((row) => row.startsWith("admin_auth="))
        : null;
    if (!authCookie) {
      window.location.href = "/admin/login?returnTo=/admin/outfits";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [outfitsRes, productsRes] = await Promise.all([fetch("/api/outfits"), fetch("/api/products")]);
      const [outfitsData, productsData] = await Promise.all([outfitsRes.json(), productsRes.json()]);
      setOutfits(Array.isArray(outfitsData) ? outfitsData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchAll();
  }, [isAuthenticated]);

  const resetForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormTitle("");
    setFormDescription("");
    setFormImageUrl("");
    setFile(null);
    setPreview(null);
    setSelectedProductIds(new Set());
    setProductQuery("");
  };

  const openCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormTitle("");
    setFormDescription("");
    setFormImageUrl("");
    setFile(null);
    setPreview(null);
    setSelectedProductIds(new Set());
    setProductQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (outfit: Outfit) => {
    setIsCreating(false);
    setEditingId(outfit.id);
    setFormTitle(outfit.title);
    setFormDescription(outfit.description || "");
    setFormImageUrl(outfit.image || "");
    setPreview(outfit.image || null);
    setFile(null);
    setSelectedProductIds(new Set(outfit.productIds || []));
    setProductQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    const q = productQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const hay = `${p.name} ${p.slug} ${p.collection}`.toLowerCase();
      return hay.includes(q);
    });
  }, [products, productQuery]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setFormImageUrl("");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this outfit idea?")) return;
    try {
      const res = await fetch(`/api/outfits?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setOutfits((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      let imageUrl = formImageUrl;

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Image upload failed");
        }
        const data = await uploadRes.json();
        imageUrl = data.url;
      }

      if (!imageUrl) throw new Error("Outfit image is required");
      if (!formTitle.trim()) throw new Error("Title is required");

      const method = editingId ? "PATCH" : "POST";
      const body = {
        ...(editingId ? { id: editingId } : {}),
        title: formTitle.trim(),
        description: formDescription.trim(),
        image: imageUrl,
        productIds: Array.from(selectedProductIds),
      };

      const res = await fetch("/api/outfits", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");

      setStatus("success");
      setMessage(editingId ? "Outfit updated." : "Outfit created.");
      resetForm();
      await fetchAll();
      setTimeout(() => setMessage(""), 3500);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err?.message || "Something went wrong");
      setTimeout(() => setMessage(""), 4500);
    } finally {
      setStatus("idle");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tighter">Outfit Ideas</h1>
            <p className="text-stone-500 font-bold text-sm mt-2">Create outfits and attach the products you want to show.</p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 text-white font-black shadow-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={18} />
            New Outfit
          </button>
        </div>

        {message && (
          <div
            className={`mb-8 rounded-2xl p-4 font-bold text-sm border ${
              status === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            {message}
          </div>
        )}

        {(isCreating || editingId) && (
          <div className="mb-12 bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
            <div className="p-6 sm:p-10 border-b border-stone-100 flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Admin</div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">{editingId ? "Edit Outfit" : "Create Outfit"}</h2>
              </div>
              <button onClick={resetForm} className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Title</label>
                  <input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm"
                    placeholder="e.g. John Wick - Red Circle Outfit"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Description (optional)</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm min-h-[110px]"
                    placeholder="Short context: movie/scene, styling notes..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Outfit Image</label>

                  <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-stone-100 font-black text-sm hover:border-orange-500 transition-colors">
                        <Upload size={16} />
                        Upload
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                      <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">or</div>
                      <input
                        value={formImageUrl}
                        onChange={(e) => {
                          setFormImageUrl(e.target.value);
                          setPreview(e.target.value || null);
                          setFile(null);
                        }}
                        className="flex-[2] px-4 py-3 bg-white border border-stone-100 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm"
                        placeholder="Paste image URL"
                      />
                    </div>

                    <div className="mt-4 rounded-2xl overflow-hidden bg-stone-200 aspect-[4/3]">
                      {preview ? (
                        <img src={preview} alt="Outfit preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                          <ImageIcon size={36} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-2xl bg-stone-900 text-white font-black hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-60"
                >
                  {status === "loading" ? "Saving..." : editingId ? "Save Changes" : "Create Outfit"}
                </button>
              </div>

              <div className="lg:col-span-7">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Products</div>
                    <div className="text-lg font-black mt-1">Choose products to show</div>
                  </div>
                  <div className="text-xs font-black text-stone-500">{selectedProductIds.size} selected</div>
                </div>

                <div className="mb-4 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    value={productQuery}
                    onChange={(e) => setProductQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-orange-500 font-bold text-sm"
                    placeholder="Search products..."
                  />
                </div>

                <div className="max-h-[620px] overflow-y-auto rounded-3xl border border-stone-100 bg-stone-50 p-2">
                  {filteredProducts.map((p) => {
                    const checked = selectedProductIds.has(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-3xl text-left hover:bg-white transition-colors ${
                          checked ? "bg-white border border-orange-200" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-stone-200 flex-shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                              <ImageIcon size={18} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-stone-900 text-sm truncate">{p.name}</div>
                          <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest truncate mt-0.5">
                            {p.collection}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                            checked ? "bg-orange-500 border-orange-500" : "border-stone-200 bg-white"
                          }`}
                        >
                          {checked && <Check size={14} className="text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3].map((i) => <div key={i} className="h-80 bg-stone-200 rounded-[2rem] animate-pulse" />)
          ) : outfits.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-stone-100">
              <div className="text-stone-400 font-black uppercase tracking-widest text-xs">No outfits yet</div>
              <div className="text-2xl font-black mt-2">Create your first outfit idea</div>
            </div>
          ) : (
            outfits.map((o) => (
              <div
                key={o.id}
                className="group bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] relative bg-stone-100 overflow-hidden">
                  {o.image ? (
                    <img
                      src={o.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={o.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-black uppercase tracking-widest text-stone-700 border border-stone-200 shadow-sm">
                      {o.productIds.length} item{o.productIds.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button
                      onClick={() => openEdit(o)}
                      className="p-3 bg-white rounded-xl shadow-lg hover:bg-stone-50 text-stone-900 transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(o.id)}
                      className="p-3 bg-red-500 rounded-xl shadow-lg hover:bg-red-600 text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-1 line-clamp-2">{o.title}</h3>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-3">{o.slug}</div>
                  {o.description && <p className="text-xs text-stone-500 font-medium line-clamp-2">{o.description}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

