'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Clock, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import ProductCard from './ProductCard';

type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
    category: string;
};

export default function LandingPage({ products }: { products: Product[] }) {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<'TOUT' | 'HOMME' | 'FEMME'>('TOUT');

    const filteredProducts = activeTab === 'TOUT'
        ? products
        : products.filter(p => p.category === activeTab);

    return (
        <div className="bg-black text-white font-sans selection:bg-gold selection:text-black">
            {/* Top Bar */}
            <div className="bg-gold/10 border-b border-white/5 text-gold text-center py-2 text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm">
                Livraison Gratuite 24H &middot; Paiement à la Livraison &middot; Garantie 1 An
            </div>

            {/* Hero Section */}
            <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1547996160-71df45ef82cb?q=80&w=2627&auto=format&fit=crop"
                        alt="Luxury Watch Background"
                        fill
                        className="object-cover opacity-50 grayscale scale-105 animate-slow-zoom"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-gold text-xs md:text-sm uppercase tracking-[0.5em] mb-6 font-medium"
                    >
                        Nouvelle Collection 2026
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 text-white tracking-tighter leading-none"
                    >
                        ELXIR<span className="text-gold">.</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col md:flex-row gap-6 justify-center items-center"
                    >
                        <button
                            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-12 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 overflow-hidden"
                        >
                            <span className="relative z-10">Découvrir la Collection</span>
                            <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Dual Banners - Inspired by Orologio.ma */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 -mt-10 relative z-20 max-w-[1800px] mx-auto">
                <Link href="/collection/homme" className="relative h-[600px] group overflow-hidden border border-white/5">
                    <Image
                        src="https://images.unsplash.com/photo-1619134778706-cfa55396dc1d?q=80&w=800&auto=format&fit=crop"
                        alt="Collection Homme"
                        fill
                        className="object-cover transition duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-12 left-12">
                        <span className="text-gold text-xs uppercase tracking-widest mb-2 block">Pour Lui</span>
                        <h3 className="font-serif text-4xl text-white mb-4">COLLECTION HOMME</h3>
                        <span className="inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-white">Découvrir</span>
                    </div>
                </Link>
                <Link href="/collection/femme" className="relative h-[600px] group overflow-hidden border border-white/5">
                    <Image
                        src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=800&auto=format&fit=crop"
                        alt="Collection Femme"
                        fill
                        className="object-cover transition duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-12 left-12">
                        <span className="text-gold text-xs uppercase tracking-widest mb-2 block">Pour Elle</span>
                        <h3 className="font-serif text-4xl text-white mb-4">COLLECTION FEMME</h3>
                        <span className="inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.2em] text-white">Découvrir</span>
                    </div>
                </Link>
            </section>

            {/* Collection Grid */}
            <section id="collection" className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="flex flex-col items-center mb-20 space-y-8">
                    <h2 className="font-serif text-4xl md:text-5xl">Nos Garde-Temps</h2>

                    {/* Filter Tabs */}
                    <div className="flex gap-8 border-b border-white/10 pb-4">
                        {['TOUT', 'HOMME', 'FEMME'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${activeTab === tab ? 'text-gold' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-[-17px] left-0 right-0 h-[1px] bg-gold"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8"
                >
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 uppercase tracking-widest text-xs">
                        Aucun produit trouvé dans cette catégorie.
                    </div>
                )}
            </section>

            {/* Brand Values */}
            <section className="py-24 border-y border-white/5 bg-[#050505]">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { icon: Truck, title: "Livraison Gratuite", text: "Expédition sécurisée sous 24h partout au Maroc." },
                        { icon: ShieldCheck, title: "Garantie Officielle", text: "Certificat d'authenticité et garantie internationale." },
                        { icon: Clock, title: "Service Premium", text: "Support client dédié 7j/7 pour vous assister." }
                    ].map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <feature.icon size={28} className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                            <h4 className="font-serif text-lg text-white mb-3">{feature.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black pt-24 pb-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="font-serif text-3xl mb-6">ELXIR<span className="text-gold">.</span></h2>
                            <p className="text-gray-500 text-sm leading-8 max-w-sm">
                                L'excellence horlogère à portée de main. Une sélection rigoureuse des plus belles pièces pour les connaisseurs exigeants.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Navigation</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li className="hover:text-gold cursor-pointer transition">Nouveautés</li>
                                <li className="hover:text-gold cursor-pointer transition">Homme</li>
                                <li className="hover:text-gold cursor-pointer transition">Femme</li>
                                <li className="hover:text-gold cursor-pointer transition">Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Newsletter</h4>
                            <div className="flex border-b border-white/20 pb-4">
                                <input type="email" placeholder="Votre Email" className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-600 focus:placeholder-gray-400" />
                                <button className="text-gold text-xs uppercase font-bold hover:text-white transition">OK</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center border-t border-white/5 pt-12 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
                        &copy; 2026 ElxirWatches. Tous droits réservés.
                    </div>
                </div>
            </footer>
        </div>
    );
}
