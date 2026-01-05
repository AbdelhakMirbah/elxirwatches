
'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });

        // Simulating a small feedback delay or just resetting state
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-white text-black py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300 flex items-center justify-center gap-4 group active:scale-[0.98]"
        >
            {isAdding ? (
                <span className="animate-pulse">Ajout...</span>
            ) : (
                <>
                    <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                    Ajouter au Panier
                </>
            )}
        </button>
    );
}
