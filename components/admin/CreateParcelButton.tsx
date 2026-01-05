'use client';

import { createParcel } from '@/lib/actions/delivery.actions';
import { toast } from 'sonner';
import { PackagePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function CreateParcelButton({ orderId }: { orderId: string }) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!confirm("Créer une expédition pour cette commande ?")) return;

        setLoading(true);
        const res = await createParcel(orderId);
        setLoading(false);

        if (res.success) {
            toast.success("Colis créé avec succès !");
        } else {
            toast.error(res.error || "Erreur lors de la création");
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-2 rounded text-[10px] uppercase font-bold hover:bg-blue-500 hover:text-white transition disabled:opacity-50"
        >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <PackagePlus size={12} />}
            Créer Colis
        </button>
    );
}
