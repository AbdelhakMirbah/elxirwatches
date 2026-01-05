'use client';

import { useCart } from "@/context/CartContext";
import { Zap } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function BuyNowButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuyNow = () => {
        // Add to cart first
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
        // Then redirect immediately to checkout
        router.push('/checkout');
    };

    return (
        <button
            onClick={handleBuyNow}
            className="w-full bg-gold text-black py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 group active:scale-[0.98] mt-4"
        >
            <Zap size={18} className="group-hover:scale-110 transition-transform" />
            Commander Maintenant
        </button>
    );
}
