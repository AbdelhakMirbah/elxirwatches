'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const API_KEY = "1445811|6B7LZAybVxB6JWDFlzP6bKN404SyrdVquFiWuHrY";
const BASE_URL = "https://www.rapiddelivery.ma/api/v1";

export async function createParcel(orderId: string) {
    try {
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return { success: false, error: "Commande introuvable" };

        // 1. Get Shop ID
        // Hardcoded based on API response: key: 3758
        const shopId = 3758;

        /* 
        const shopRes = await fetch(`${BASE_URL}/shops`, {
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/json' },
            next: { revalidate: 3600 }
        });
        const shopData = await shopRes.json();
        const shopId = shopData[0]?.key || shopData?.shops?.[0]?.key;
        */

        if (!shopId) {
            return { success: false, error: "Shop ID missing" };
        }

        // 2. Get City ID matching the name
        const cityRes = await fetch(`${BASE_URL}/cities`, {
            headers: { 'Authorization': `Bearer ${API_KEY}`, 'Accept': 'application/json' },
            next: { revalidate: 86400 }
        });
        const cityData = await cityRes.json();
        // Assume structure { cities: [...] } or array [...]
        const citiesList = cityData.cities || cityData;
        const targetCity = citiesList.find((c: any) => c.city_name.toLowerCase().trim() === order.city.toLowerCase().trim());

        if (!targetCity) {
            console.error("Available Cities sample:", citiesList.slice(0, 5));
            return { success: false, error: `Ville non supportée par RapidDelivery: "${order.city}"` };
        }

        // 3. Correct Payload
        const payload = {
            shop: shopId,
            article: `Montre: ${order.customerName}`,
            price: order.total,
            recipient: order.customerName, // Use 'recipient'
            phone: order.customerPhone,
            city: targetCity.key,
            address: order.address,
            remark: `Cmde: ${order.id.slice(-6)}`
        };

        console.log("Sending Parcel Payload:", payload);

        const res = await fetch(`${BASE_URL}/parcels`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Create Parcel Response:", JSON.stringify(data, null, 2));

        if (!res.ok) {
            console.error("Validation Error:", data);
            return { success: false, error: data.message || "Erreur API Livraison" };
        }

        // Response structure: { message: "...", data: { key: "12345", ... } }
        // Ensure it's a string
        const trackingNumber = data.data?.key ? String(data.data?.key) : null;

        if (trackingNumber) {
            await prisma.order.update({
                where: { id: orderId },
                data: { trackingNumber, status: 'CONFIRMED' }
            });
            revalidatePath('/admin');
            return { success: true, trackingNumber };
        }

        return { success: false, error: "Pas de numéro de suivi (key) dans la réponse" };

    } catch (e) {
        console.error(e);
        return { success: false, error: "Erreur Serveur" };
    }
}

export async function createVoucher(trackingNumbers: (string | number)[]) {
    try {
        const payload = {
            shop: 3758,
            parcels: trackingNumbers.map(n => Number(n)) // Ensure integers as per example
        };

        const res = await fetch(`${BASE_URL}/vouchers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Voucher Error:", data);
            return { success: false, error: data.message || "Erreur Création Bon" };
        }

        return { success: true, voucherKey: data.data.key };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Erreur Serveur" };
    }
}
