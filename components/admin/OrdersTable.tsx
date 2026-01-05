'use client';

import { useState } from 'react';
import { createVoucher } from '@/lib/actions/delivery.actions';
import { updateTracking } from '@/lib/actions/order.actions';
import { toast } from 'sonner';
import CreateParcelButton from '@/components/admin/CreateParcelButton';
import TrackingStatus from '@/components/TrackingStatus';
import { FileText, Tags, Loader2, Download, CheckSquare, Square } from 'lucide-react';

const BASE_URL = "https://www.rapiddelivery.ma/api/v1";

export default function OrdersTable({ orders }: { orders: any[] }) {
    const [selected, setSelected] = useState<string[]>([]); // Array of Tracking Numbers
    const [voucherKey, setVoucherKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const toggleSelect = (tracking: string | null) => {
        if (!tracking) return;
        if (selected.includes(tracking)) {
            setSelected(selected.filter(s => s !== tracking));
        } else {
            setSelected([...selected, tracking]);
        }
    };

    const handleCreateVoucher = async () => {
        if (selected.length === 0) return;
        setLoading(true);
        const res = await createVoucher(selected);
        setLoading(false);
        if (res.success && res.voucherKey) {
            setVoucherKey(res.voucherKey);
            toast.success("Bon de ramassage créé avec succès !");
        } else {
            toast.error(res.error || "Erreur");
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const colors: any = {
            PENDING: 'bg-yellow-500/20 text-yellow-500',
            CONFIRMED: 'bg-blue-500/20 text-blue-500',
            SHIPPED: 'bg-purple-500/20 text-purple-500',
            DELIVERED: 'bg-green-500/20 text-green-500',
            CANCELLED: 'bg-red-500/20 text-red-500'
        };
        return (
            <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${colors[status] || 'bg-gray-500/20 text-gray-500'}`}>
                {status}
            </span>
        );
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-4 bg-black-card p-4 rounded-xl border border-white/10">
                <div className="text-sm text-gray-400">
                    {selected.length} colis sélectionnés
                </div>
                <div className="flex gap-4">
                    {voucherKey ? (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-right duration-500">
                            <a
                                href={`/api/download?url=${encodeURIComponent(`${BASE_URL}/vouchers/${voucherKey}/download`)}`}
                                target="_blank"
                                className="bg-white text-black px-4 py-2 rounded text-xs font-bold hover:bg-gold transition flex items-center gap-2"
                            >
                                <FileText size={14} /> Télécharger Bon
                            </a>
                            <a
                                href={`/api/download?url=${encodeURIComponent(`${BASE_URL}/vouchers/${voucherKey}/labels/a6/download`)}`}
                                target="_blank"
                                className="bg-white text-black px-4 py-2 rounded text-xs font-bold hover:bg-gold transition flex items-center gap-2"
                            >
                                <Tags size={14} /> Étiquettes
                            </a>
                            <button onClick={() => { setVoucherKey(null); setSelected([]); }} className="text-gray-500 hover:text-white text-xs underline">
                                Reset
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCreateVoucher}
                            disabled={selected.length === 0 || loading}
                            className="bg-gold text-black px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                            Générer Bon de Ramassage
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-black-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 uppercase text-xs tracking-wider text-gold">
                        <tr>
                            <th className="p-4 w-10">
                                {/* Select All Logic could go here */}
                            </th>
                            <th className="p-4">ID</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Statut</th>
                            <th className="p-4">Tracking (Rapid Delivery)</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 ? (
                            <tr><td colSpan={7} className="p-8 text-center text-gray-500">Aucune commande</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-4">
                                    <button
                                        onClick={() => toggleSelect(order.trackingNumber)}
                                        disabled={!order.trackingNumber}
                                        className={`transition ${selected.includes(order.trackingNumber) ? 'text-gold' : 'text-gray-600 hover:text-gray-400'}`}
                                    >
                                        {selected.includes(order.trackingNumber) ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </td>
                                <td className="p-4 font-mono text-xs text-gray-500">...{order.id.slice(-6)}</td>
                                <td className="p-4 text-white font-medium">
                                    <div>{order.customerName}</div>
                                    <div className="text-xs text-gray-500">{order.customerPhone}</div>
                                </td>
                                <td className="p-4 text-gold font-bold">{order.total} DH</td>
                                <td className="p-4"><StatusBadge status={order.status} /></td>
                                <td className="p-4">
                                    {order.trackingNumber ? (
                                        <div className="flex flex-col gap-1 w-full">
                                            <span className="text-white font-mono text-[10px] bg-white/5 px-1 rounded inline-block w-fit">{order.trackingNumber}</span>
                                            <TrackingStatus trackingNumber={order.trackingNumber} />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <CreateParcelButton orderId={order.id} />
                                            <form action={updateTracking} className="flex gap-2 items-center opacity-50 hover:opacity-100 transition">
                                                <input type="hidden" name="orderId" value={order.id} />
                                                <input name="trackingNumber" placeholder="Manuel..." className="bg-transparent border-b border-white/20 text-[10px] p-1 w-16 text-gray-500 focus:border-gold outline-none focus:text-white" />
                                            </form>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-xs">
                                    {new Date(order.createdAt).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short' })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
