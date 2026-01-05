'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

import { createOrder } from '@/lib/actions/order.actions';

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: 'Casablanca',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('customerName', formData.name);
            data.append('customerPhone', formData.phone);
            data.append('city', formData.city);
            data.append('address', formData.address);
            data.append('cartItems', JSON.stringify(cart));

            // null as prevState for direct call
            const result = await createOrder(null, data);

            if (result.success) {
                setStep('success');
                clearCart();
                toast.success("Commande reçue !");
            } else {
                toast.error("Erreur serveur");
            }
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-black-card border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                >
                    {step === 'form' ? (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-serif text-2xl text-white">Finaliser</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="mb-6 bg-white/5 p-4 rounded-lg flex justify-between items-center">
                                <span className="text-gray-400">{cart.length} articles</span>
                                <span className="text-gold font-bold text-xl">{cartTotal} DH</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nom Complet</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black-rich border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Téléphone</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-black-rich border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition"
                                        placeholder="06 XX XX XX XX"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Ville</label>
                                        <select
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-black-rich border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition appearance-none"
                                        >
                                            <option>Casablanca</option>
                                            <option>Rabat</option>
                                            <option>Marrakech</option>
                                            <option>Tanger</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Adresse</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full bg-black-rich border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none transition"
                                            placeholder="Quartier..."
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition mt-6 disabled:opacity-50 flex justify-center"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : "Commander (Paiement à la livraison)"}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle size={40} />
                            </motion.div>
                            <h2 className="font-serif text-3xl text-white mb-4">Merci !</h2>
                            <p className="text-gray-400 mb-8">Votre commande a été reçue. Nous vous appellerons bientôt pour confirmer.</p>
                            <button
                                onClick={onClose}
                                className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-white/20 transition"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
