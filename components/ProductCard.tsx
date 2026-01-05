'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    oldPrice?: number | null;
    images: string[];
    category: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <Link href={`/product/${product.id}`}>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
            >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-6 border border-white/5">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <button
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation when clicking 'add to cart'
                                e.stopPropagation();
                                addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    quantity: 1
                                });
                            }}
                            className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-colors duration-300 flex items-center justify-center gap-3"
                        >
                            <ShoppingBag size={14} /> Ajouter au Panier
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                        {product.oldPrice && (
                            <span className="bg-red-600 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-red-900/20">
                                Promo
                            </span>
                        )}
                        <span className="bg-black/50 backdrop-blur text-white px-3 py-1 text-[10px] uppercase tracking-widest border border-white/10">
                            {product.brand}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-500">
                    <h3 className="font-serif text-xl mb-2 text-gray-200 group-hover:text-white transition-colors">{product.name}</h3>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-gold font-bold text-sm tracking-widest">{product.price.toLocaleString()} DH</span>
                        {product.oldPrice && (
                            <span className="text-white/30 text-xs line-through decoration-white/30">{product.oldPrice.toLocaleString()} DH</span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );

}
