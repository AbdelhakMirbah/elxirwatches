'use client';

import { useCart } from "@/context/CartContext";
import { Truck, ShieldCheck, CheckCircle, Home, Phone, User, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/lib/actions/order.actions";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const initialState: any = {
    error: '',
    success: false,
    orderId: ''
};

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(createOrder, initialState);

    // If cart is empty, redirect to home (unless we just placed an order)
    useEffect(() => {
        if (cart.length === 0 && !state.success) {
            router.push('/');
        }
    }, [cart, router, state.success]);

    useEffect(() => {
        if (state.success && state.orderId) {
            clearCart();
            router.push(`/checkout/success/${state.orderId}`);
        }
    }, [state.success, state.orderId, clearCart, router]);

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">Finaliser votre Commande</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Form Section */}
                <div className="order-2 lg:order-1">
                    <div className="bg-[#111] p-8 border border-white/5 rounded-sm">
                        <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                            <Truck className="text-gold" size={24} /> Livraison
                        </h2>

                        <form action={formAction} className="space-y-6">
                            <input type="hidden" name="cartItems" value={JSON.stringify(cart)} />

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <User size={14} /> Nom Complet
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    required
                                    placeholder="Votre nom et prénom"
                                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <Phone size={14} /> Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="customerPhone"
                                    required
                                    placeholder="06..."
                                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <Home size={14} /> Ville
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="Casablanca, Rabat, etc."
                                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                    <MapPin size={14} /> Adresse
                                </label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    placeholder="Votre adresse de livraison..."
                                    className="w-full bg-black border border-white/10 p-4 text-white focus:border-gold outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-gold text-black py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 flex items-center justify-center gap-4 group active:scale-[0.98]"
                                >
                                    {isPending ? 'Confirmation...' : 'Confirmer la Commande'}
                                    {!isPending && <CheckCircle size={18} />}
                                </button>
                                {state.error && (
                                    <p className="text-red-500 text-sm mt-4 text-center">{state.error}</p>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-white/40 text-xs">
                        <ShieldCheck size={14} /> Paiement Sécurisé à la Livraison
                    </div>
                </div>

                {/* Summary Section */}
                <div className="order-1 lg:order-2">
                    <div className="bg-[#111] p-8 border border-white/5 rounded-sm sticky top-32">
                        <h2 className="text-xl font-serif text-white mb-6">Récapitulatif</h2>

                        <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-20 h-24 bg-[#050505] flex-shrink-0 border border-white/5">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-serif text-sm mb-1">{item.name}</h3>
                                        <p className="text-gold text-sm">{item.price.toLocaleString()} DH</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-6 space-y-3">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Sous-total</span>
                                <span>{cartTotal.toLocaleString()} DH</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Livraison</span>
                                <span className="text-green-500 uppercase text-xs font-bold tracking-wider">Gratuite</span>
                            </div>
                            <div className="flex justify-between text-white text-lg font-serif pt-4 border-t border-white/10 mt-4">
                                <span>Total</span>
                                <span className="text-gold">{cartTotal.toLocaleString()} DH</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
