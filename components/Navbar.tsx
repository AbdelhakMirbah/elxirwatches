'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Existing brands list
const BRANDS = [
    { name: "Casio", href: "/collection/brand/casio" },
    { name: "Festina", href: "/collection/brand/festina" },
    { name: "Daniel Hechter", href: "/collection/brand/daniel-hechter" },
    { name: "Jaguar", href: "/collection/brand/jaguar" },
];

import { usePathname } from 'next/navigation';
// ... other imports

export default function Navbar() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const { cart, setIsCartOpen } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBrandsOpen, setIsBrandsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ADMIN NAVBAR
    if (isAdmin) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/admin" className="font-serif text-xl text-white font-bold tracking-wider">
                        ELXIR<span className="text-gold">.ADMIN</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <Link href="/admin" className={`hover:text-gold transition ${pathname === '/admin' ? 'text-white' : ''}`}>Dashboard</Link>
                        <Link href="/admin/products" className={`hover:text-gold transition ${pathname.includes('/products') ? 'text-white' : ''}`}>Produits</Link>
                        <Link href="/admin#orders" className="hover:text-gold transition">Commandes</Link>
                    </div>

                    <Link href="/" className="text-xs text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
                        Voir le site
                    </Link>
                </div>
            </nav>
        );
    }

    // PUBLIC NAVBAR (Existing Code)
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-black/90 backdrop-blur-md border-white/5' : 'bg-transparent border-transparent'}`}>

            {/* Announcement Bar */}
            <div className="bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.2em] text-center py-2 uppercase flex items-center justify-center gap-4">
                <span>Livraison Gratuite 🇲🇦</span>
                <span className="hidden md:inline">•</span>
                <span>Paiement à la Livraison</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl text-white font-bold tracking-wider">
                    ELXIR<span className="text-gold">.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-gray-400">
                    <Link href="/" className="hover:text-gold transition">Accueil</Link>

                    {/* Brands Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsBrandsOpen(true)}
                        onMouseLeave={() => setIsBrandsOpen(false)}
                    >
                        <button className="flex items-center gap-1 hover:text-gold transition group-hover:text-gold">
                            Marques <ChevronDown size={14} />
                        </button>

                        <AnimatePresence>
                            {isBrandsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48"
                                >
                                    <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm py-2 shadow-xl">
                                        {BRANDS.map(brand => (
                                            <Link
                                                key={brand.name}
                                                href={brand.href}
                                                className="block px-6 py-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition"
                                            >
                                                {brand.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/collection/homme" className="hover:text-gold transition">Pour Hommes</Link>
                    <Link href="/collection/femme" className="hover:text-gold transition">Pour Femmes</Link>
                    <Link href="/collection/accessoires" className="hover:text-gold transition">Accessoires</Link>
                    <Link href="/contact" className="hover:text-gold transition">Contact</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-white/5 rounded-full transition"
                    >
                        <ShoppingBag className="text-white" size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 w-5 h-5 bg-gold text-black textxs font-bold flex items-center justify-center rounded-full text-[10px]">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <button
                        className="md:hidden p-2 hover:bg-white/5 rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="text-white" size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black-card border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4 text-center text-sm font-medium tracking-widest uppercase">
                            <Link href="/" className="text-white hover:text-gold py-2">Accueil</Link>
                            <div className="py-2 border-y border-white/5">
                                <span className="text-gold text-xs mb-2 block opacity-50">Nos Marques</span>
                                {BRANDS.map(brand => (
                                    <Link key={brand.name} href={brand.href} className="block py-2 text-gray-400">{brand.name}</Link>
                                ))}
                            </div>
                            <Link href="/collection/homme" className="text-white hover:text-gold py-2">Pour Hommes</Link>
                            <Link href="/collection/femme" className="text-white hover:text-gold py-2">Pour Femmes</Link>
                            <Link href="/collection/accessoires" className="text-white hover:text-gold py-2">Accessoires</Link>
                            <Link href="/contact" className="text-white hover:text-gold py-2">Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
