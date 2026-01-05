
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton'; // We will create this client component for interactivity
import { ArrowLeft, Check, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import RelatedProducts from '@/components/RelatedProducts';
import ProductImageGallery from '@/components/ProductImageGallery';
import BuyNowButton from '@/components/BuyNowButton';
import WhatsAppButton from '@/components/WhatsAppButton';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        return notFound();
    }

    // Fetch related products (same category, excluding current)
    const relatedProducts = await prisma.product.findMany({
        where: {
            category: product.category,
            id: { not: product.id }
        },
        take: 4
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm tracking-widest uppercase">
                <ArrowLeft size={16} /> Retour
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-32">
                {/* Image Section */}
                <div className="relative">
                    <ProductImageGallery images={product.images} name={product.name} />

                    {/* Floating Brand Badge */}
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 z-10 pointer-events-none">
                        <span className="text-white text-xs uppercase tracking-[0.2em]">{product.brand}</span>
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center">
                    <div className="mb-2">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">{product.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">{product.name}</h1>
                    <div className="flex items-baseline gap-4 mb-8">
                        <div className="text-3xl md:text-5xl text-gold font-light tracking-wide">
                            {product.price.toLocaleString()} DH
                        </div>
                        {product.oldPrice && (
                            <div className="text-xl text-white/30 line-through decoration-white/30">
                                {product.oldPrice.toLocaleString()} DH
                            </div>
                        )}
                        {product.oldPrice && (
                            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded ml-2">
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </span>
                        )}
                    </div>

                    <div className="prose prose-invert prose-sm mb-10 text-white/60 leading-relaxed font-light">
                        <p>{product.description}</p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="flex items-center gap-3 p-4 border border-white/5 bg-white/2">
                            <Truck className="text-gold" size={20} />
                            <div className="flex flex-col">
                                <span className="text-white text-xs uppercase tracking-wider font-bold">Livraison Gratuite</span>
                                <span className="text-white/40 text-[10px]">Partout au Maroc</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 border border-white/5 bg-white/2">
                            <Shield className="text-gold" size={20} />
                            <div className="flex flex-col">
                                <span className="text-white text-xs uppercase tracking-wider font-bold">Garantie 2 Ans</span>
                                <span className="text-white/40 text-[10px]">Certificat Authenticité</span>
                            </div>
                        </div>
                    </div>

                    {/* Action */}
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                        <BuyNowButton product={product} />
                        <AddToCartButton product={product} />
                        <WhatsAppButton productName={product.name} />
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-white/40 text-sm">
                            <Check size={14} className="text-green-500" /> Stock disponible
                        </div>
                        <div className="flex items-center gap-3 text-white/40 text-sm">
                            <Check size={14} className="text-green-500" /> Paiement à la livraison
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-white/5 pt-20">
                    <h2 className="text-2xl font-serif text-white mb-10 text-center">Vous aimerez aussi</h2>
                    <RelatedProducts products={relatedProducts} />
                </div>
            )}
        </div>
    );
}
