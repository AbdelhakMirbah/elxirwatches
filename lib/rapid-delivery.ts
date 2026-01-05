'use server';

const API_KEY = "1445811|6B7LZAybVxB6JWDFlzP6bKN404SyrdVquFiWuHrY";
const BASE_URL = "https://www.rapiddelivery.ma/api/v1";

export interface TrackingInfo {
    tracking_number?: string;
    status_name?: string;
    status_code?: string;
    // Add other fields as discovered
}

export async function getTrackingStatus(trackingNumber: string) {
    if (!trackingNumber) return null;

    const url = `${BASE_URL}/parcels/${trackingNumber}`;
    console.log(`Fetching Tracking: ${url}`);

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            },
            next: { revalidate: 0 } // Disable cache for debugging
        });

        if (!res.ok) {
            console.error(`Tracking API Error: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.error("Response Body:", text);
            return { error: `API Error: ${res.status}` };
        }

        const data = await res.json();
        console.log("Tracking Data:", data);
        return data.parcel || data; // Adapt to API response
    } catch (e) {
        console.error("Tracking Fetch Error", e);
        return { error: "Network Error" };
    }
}
