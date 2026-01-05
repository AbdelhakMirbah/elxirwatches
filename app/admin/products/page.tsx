import { prisma } from '@/lib/prisma';
import { deleteProduct } from '@/lib/actions/product.actions';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });



    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-white">Produits</h1>
                <Link
                    href="/admin/products/new"
                    className="bg-gold text-black px-4 py-2 rounded font-bold uppercase text-xs tracking-widest hover:bg-white transition flex items-center gap-2"
                >
                    <Plus size={16} /> Ajouter
                </Link>
            </div>

            <div className="bg-black-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 uppercase text-xs tracking-wider text-gold">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Nom</th>
                            <th className="p-4">Marque</th>
                            <th className="p-4">Prix</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-white/[0.02] transition">
                                <td className="p-4">
                                    <div className="relative w-12 h-12 bg-white/5 rounded overflow-hidden">
                                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-white">{product.name}</td>
                                <td className="p-4">{product.brand}</td>
                                <td className="p-4 text-gold">{product.price} DH</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4 flex justify-end gap-3 items-center h-full pt-8">
                                    <Link href={`/admin/products/${product.id}/edit`} className="text-gray-500 hover:text-white"><Edit size={16} /></Link>
                                    <form action={async (formData) => {
                                        'use server';
                                        await deleteProduct(product.id);
                                    }}>
                                        <button type="submit" className="text-red-500/50 hover:text-red-500 transition"><Trash2 size={16} /></button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
