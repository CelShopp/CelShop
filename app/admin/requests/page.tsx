import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Inbox, Mail, Clock } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminPassword } from "@/lib/auth";

export default async function RequestsPage() {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth")?.value;
    const adminPassword = getAdminPassword();

    if (adminAuth !== adminPassword) {
        redirect("/admin/login?returnTo=/admin/requests");
    }

    let requests: any[] = [];
    try {
        requests = await prisma.request.findMany({
            orderBy: { createdAt: "desc" },
        });
    } catch (e) {
        console.error("Failed to fetch requests:", e);
    }

    return (
        <div>
            <div className="mb-8">
                <Link
                    href="/admin/add"
                    className="group inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Admin
                </Link>
            </div>

            <header className="mb-12">
                <div className="flex items-center gap-2 text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                    <Inbox size={14} />
                    Incoming Requests
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900">
                    User <span className="text-stone-300">Requests</span>
                </h1>
                <p className="text-stone-400 font-medium mt-4">
                    {requests.length} request{requests.length !== 1 ? "s" : ""} total
                </p>
            </header>

            {requests.length === 0 ? (
                <div className="bg-white rounded-[3rem] shadow-xl border border-stone-100 p-16 text-center">
                    <Inbox className="mx-auto mb-6 text-stone-200" size={48} />
                    <h3 className="text-xl font-black text-stone-900 mb-2">No requests yet</h3>
                    <p className="text-stone-400 font-medium">When users submit outfit requests, they&apos;ll appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req: any) => (
                        <div key={req.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-stone-300 uppercase tracking-widest">
                                    <Clock size={10} />
                                    {new Date(req.createdAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="text-[9px] font-mono text-stone-300">{req.id}</div>
                            </div>

                            <p className="text-stone-900 font-medium text-base leading-relaxed mb-3">
                                {req.content}
                            </p>

                            {req.email && (
                                <div className="flex items-center gap-2 text-sm text-stone-400">
                                    <Mail size={12} className="text-orange-500" />
                                    <span className="font-medium">{req.email}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
