"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Edit2, ImageIcon, Layout, Plus, Search, Trash2, Upload, X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  collection: string;
};

type Actor = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  productIds: string[];
};

export default function AdminActorsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [actors, setActors] = useState<Actor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
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
      window.location.href = "/admin/login?returnTo=/admin/actors";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [actorsRes, productsRes] = await Promise.all([fetch("/api/actors"), fetch("/api/products")]);
      const [actorsData, productsData] = await Promise.all([actorsRes.json(), productsRes.json()]);
      setActors(Array.isArray(actorsData) ? actorsData : []);
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
    setFormName("");
    setFormImageUrl("");
    setFile(null);
    setPreview(null);
    setSelectedProductIds(new Set());
    setProductQuery("");
  };

  const openCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormName("");
    setFormImageUrl("");
    setFile(null);
    setPreview(null);
    setSelectedProductIds(new Set());
    setProductQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (actor: Actor) => {
    setIsCreating(false);
    setEditingId(actor.id);
    setFormName(actor.name);
    setFormImageUrl(actor.image || "");
    setPreview(actor.image || null);
    setFile(null);
    setSelectedProductIds(new Set(actor.productIds || []));
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
    if (!confirm("Delete this actor card?")) return;
    try {
      const res = await fetch(`/api/actors?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setActors((prev) => prev.filter((a) => a.id !== id));
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

      const method = editingId ? "PATCH" : "POST";
      const res = await fetch("/api/actors", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editingId ? { id: editingId } : {}),
          name: formName,
          image: imageUrl,
          productIds: Array.from(selectedProductIds),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Operation failed");

      setStatus("success");
      setMessage(editingId ? "Actor updated." : "Actor created.");
      await fetchAll();
      resetForm();
      setTimeout(() => setMessage(""), 2500);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err?.message || "Network error");
      setTimeout(() => setMessage(""), 3500);
    } finally {
      setStatus("idle");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24">
      <main className="max-w-6xl mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              <Layout size={14} />
              Actor Management
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
              Actors <span className="text-stone-300">Vault</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/manage"
              className="px-6 py-3 bg-white border border-stone-200 text-stone-900 font-black rounded-xl hover:bg-stone-50 transition-all shadow-sm"
            >
              Back
            </Link>
            <button
              onClick={openCreate}
              className="px-6 py-3 bg-stone-900 text-white font-black rounded-xl hover:bg-stone-800 transition-all shadow-xl flex items-center gap-2"
            >
              <Plus size={18} />
              New Actor
            </button>
          </div>
        </header>

        {message && (
          <div
            className={`mb-8 p-4 rounded-xl font-bold text-center animate-in fade-in slide-in-from-top-2 ${
              status === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        {(isCreating || editingId) && (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-2xl animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">{editingId ? "Edit" : "Create"} Actor</h2>
              <button onClick={resetForm} className="p-2 hover:bg-stone-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-stone-400 mb-1 ml-1 block">Actor Name</label>
                  <input
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold"
                    placeholder="e.g. Ranbir Kapoor"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-stone-400 mb-1 ml-1 block">Card Photo</label>
                  <div
                    onClick={() => document.getElementById("actor-upload")?.click()}
                    className="w-full aspect-[4/3] bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-stone-100 transition-all overflow-hidden"
                  >
                    {preview ? (
                      <img src={preview} className="w-full h-full object-cover object-top" alt="Preview" />
                    ) : (
                      <>
                        <Upload className="text-stone-300" size={32} />
                        <div className="text-center">
                          <div className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Upload Image</div>
                        </div>
                      </>
                    )}
                  </div>
                  <input id="actor-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />

                  <div>
                    <input
                      value={formImageUrl}
                      onChange={(e) => {
                        setFormImageUrl(e.target.value);
                        setPreview(e.target.value || null);
                        setFile(null);
                      }}
                      className="w-full px-5 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold text-sm"
                      placeholder="Or paste Image URL"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-stone-900 text-white font-black rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {status === "loading" ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                  ) : (
                    <>
                      <Check size={18} /> Save Actor
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-[10px] font-black uppercase text-stone-400 ml-1 block">
                    Choose Products ({selectedProductIds.size})
                  </label>
                  <div className="relative w-full max-w-xs">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      value={productQuery}
                      onChange={(e) => setProductQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-orange-500 font-bold text-sm"
                      placeholder="Search products..."
                    />
                  </div>
                </div>

                <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-stone-100 bg-stone-50 p-2">
                  {filteredProducts.map((p) => {
                    const checked = selectedProductIds.has(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleProduct(p.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left hover:bg-white transition-colors ${
                          checked ? "bg-white border border-orange-200" : ""
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
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
          ) : (
            actors.map((actor) => (
              <div
                key={actor.id}
                className="group bg-white rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] relative bg-stone-100 overflow-hidden">
                  {actor.image ? (
                    <img
                      src={actor.image}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      alt={actor.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <ImageIcon size={48} strokeWidth={1} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button onClick={() => openEdit(actor)} className="p-3 bg-white rounded-xl shadow-lg hover:bg-stone-50 text-stone-900 transition-all">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(actor.id)} className="p-3 bg-red-500 rounded-xl shadow-lg hover:bg-red-600 text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-1">{actor.name}</h3>
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-3">{actor.slug}</div>
                  <div className="text-xs text-stone-500 font-bold">{actor.productIds.length} product{actor.productIds.length === 1 ? "" : "s"}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
