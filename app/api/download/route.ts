import { NextRequest, NextResponse } from 'next/server';

const API_KEY = "1445811|6B7LZAybVxB6JWDFlzP6bKN404SyrdVquFiWuHrY";

export async function GET(req: NextRequest) {
    const targetUrl = req.nextUrl.searchParams.get('url');

    if (!targetUrl) {
        return new NextResponse("URL parameter missing", { status: 400 });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            return new NextResponse(`Upstream Error: ${response.status} ${response.statusText}`, { status: response.status });
        }

        // Forward headers like Content-Type (HTML/PDF) and Content-Disposition
        const headers = new Headers();
        if (response.headers.get('content-type')) headers.set('Content-Type', response.headers.get('content-type')!);
        if (response.headers.get('content-disposition')) headers.set('Content-Disposition', response.headers.get('content-disposition')!);

        return new NextResponse(response.body, { headers });
    } catch (e) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
