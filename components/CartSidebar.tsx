'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, addToCart, cartTotal } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-black-card border-l border-white/10 z-[70] flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h2 className="font-serif text-xl text-white flex items-center gap-2">
                                    <ShoppingBag size={20} />
                                    Mon Panier
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                                    <X />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                                        <ShoppingBag size={48} className="opacity-20" />
                                        <p>Votre panier est vide</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="text-gold hover:underline text-sm"
                                        >
                                            Découvrir la collection
                                        </button>
                                    </div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-20 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-serif text-white">{item.name}</h3>
                                                    <p className="text-gold text-sm">{item.price} DH</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3 bg-white/5 rounded px-2 py-1">
                                                        <button
                                                            onClick={() => item.quantity > 1 ? addToCart({ ...item, quantity: -1 }) : removeFromCart(item.id)} // Logic simplified
                                                            className="text-gray-400 hover:text-white"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-sm text-white w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => addToCart(item)}
                                                            className="text-gray-400 hover:text-white"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500/50 hover:text-red-500 transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/10 bg-black-rich">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-gray-400 uppercase tracking-widest text-xs">Total</span>
                                        <span className="text-2xl font-serif text-gold">{cartTotal} DH</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            setIsCheckoutOpen(true);
                                        }}
                                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-gold transition"
                                    >
                                        Passer à la caisse
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </>
    );
}
