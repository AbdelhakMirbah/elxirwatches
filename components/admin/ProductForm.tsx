
'use client';

import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Product = {
    id?: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    stock: number;
};

export default function ProductForm({ product }: { product?: Product }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        // The actual form submission is handled by the action attribute, 
        // but we want to show loading state. 
        // In a real app we might use useFormAction or similar hooks.
    };

    const action = async (formData: FormData) => {
        if (product) {
            await updateProduct(product.id!, formData);
        } else {
            await createProduct(formData);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <Link href="/admin/products" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 text-sm">
                <ArrowLeft size={16} /> Retour aux produits
            </Link>

            <h1 className="text-3xl font-serif text-white mb-8">
                {product ? 'Modifier Produit' : 'Nouveau Produit'}
            </h1>

            <form action={action} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Nom du produit</label>
                        <input name="name" defaultValue={product?.name} required className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none" placeholder="Ex: Rolex Submariner" />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Marque</label>
                        <input name="brand" defaultValue={product?.brand} required className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none" placeholder="Ex: Rolex" />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Prix (DH)</label>
                        <input type="number" name="price" defaultValue={product?.price} required className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none" placeholder="0.00" />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Catégorie</label>
                        <select name="category" defaultValue={product?.category || "HOMME"} className="w-full bg-[#111] border border-white/10 rounded p-3 text-white focus:border-gold outline-none">
                            <option value="HOMME">HOMME</option>
                            <option value="FEMME">FEMME</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Stock</label>
                        <input type="number" name="stock" defaultValue={product?.stock || 1} required className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none" />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">URLs des images</label>
                        <textarea
                            name="imageUrls"
                            defaultValue={product?.images?.join(', ')}
                            required
                            rows={3}
                            className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none"
                            placeholder="https://image1.com, https://image2.com"
                        />
                        <p className="text-xs text-white/30 mt-1">Séparez les URLs par des virgules.</p>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2">Description</label>
                        <textarea name="description" defaultValue={product?.description} rows={4} className="w-full bg-white/5 border border-white/10 rounded p-3 text-white focus:border-gold outline-none" placeholder="Description détaillée..." />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-white transition flex items-center justify-center gap-2"
                >
                    {isLoading && <Loader2 className="animate-spin" size={20} />}
                    {product ? 'Sauvegarder' : 'Créer le Produit'}
                </button>
            </form>
        </div>
    );
}
