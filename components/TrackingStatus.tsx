'use client';

import { getTrackingStatus, TrackingInfo } from '@/lib/rapid-delivery';
import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

export default function TrackingStatus({ trackingNumber }: { trackingNumber: string }) {
    const [info, setInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrackingStatus(trackingNumber).then(res => {
            setInfo(res);
            setLoading(false);
        });
    }, [trackingNumber]);

    if (loading) return <span className="text-gray-500 text-[10px] animate-pulse">Sync...</span>;

    // Fallback if no specific data structure known yet
    const displayStatus = info?.status_name || info?.status || "En cours";

    return (
        <div className="flex items-center gap-1">
            <Truck size={12} className="text-blue-500" />
            <span className="text-blue-400 text-[10px] uppercase font-bold">
                {displayStatus}
            </span>
        </div>
    );
}
