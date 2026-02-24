import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-24">
            <main className="max-w-4xl mx-auto px-6">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-4">
                        Refund <span className="text-stone-300">Policy</span>
                    </h1>
                </header>

                <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mb-8">
                        <ShieldAlert size={40} />
                    </div>

                    <h2 className="text-2xl font-black text-stone-900 mb-6 uppercase tracking-tight">No Direct Sales</h2>

                    <div className="max-w-2xl space-y-6 text-stone-600 leading-relaxed font-medium">
                        <p className="text-lg">
                            FilmyFits is a curation and referral service. We do not sell products directly and do not collect payments on our platform.
                        </p>

                        <div className="p-8 bg-red-50/50 rounded-2xl border border-red-100 text-red-900">
                            <h3 className="font-black uppercase tracking-widest text-[10px] mb-2">Important Notice</h3>
                            <p className="text-sm font-bold">
                                We do not handle any refunds, returns, or exchange requests.
                            </p>
                        </div>

                        <p>
                            All purchases are made through third-party retailers (such as Amazon). If you need a refund or have an issue with your order, you must contact the retailer where you completed the purchase directly.
                        </p>

                        <p className="text-sm opacity-60 italic">
                            Their specific refund policies will apply to your transaction.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
