import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;
    const decodedBrand = decodeURIComponent(brand).replace(/-/g, ' ');
    return {
        title: `Montres ${decodedBrand.charAt(0).toUpperCase() + decodedBrand.slice(1)} | ElxirWatches`,
        description: `Découvrez notre collection exclusive de montres ${decodedBrand}.`
    };
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
    const { brand } = await params;

    // Convert url slug back to brand name format (e.g. "daniel-hechter" -> "Daniel Hechter")
    // This is a loose match, in production you might want a precise mapping or exact string match if DB is clean
    const searchBrand = decodeURIComponent(brand).replace(/-/g, ' ');

    const products = await prisma.product.findMany({
        where: {
            brand: {
                contains: searchBrand,
                mode: 'insensitive'
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Collection Officielle</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-tight">{searchBrand}</h1>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-32 text-gray-500 border border-white/5 rounded-xl bg-white/[0.02]">
                        <p className="tracking-widest uppercase text-xs">Aucun modèle {searchBrand} disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
                        {products.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
