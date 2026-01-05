import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Accessoires de Luxe | ElxirWatches',
    description: 'Découvrez nos bracelets, écrins et accessoires pour montres.',
};

export default async function AccessoriesPage() {
    const products = await prisma.product.findMany({
        where: { category: 'ACCESSOIRES' as any }, // Assuming you will add this enum value or use string if flexibility needed
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <span className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block">Complétez votre Style</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-tight">Accessoires</h1>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-32 text-gray-500 border border-white/5 rounded-xl bg-white/[0.02]">
                        <p className="tracking-widest uppercase text-xs">La collection d'accessoires arrive bientôt.</p>
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
