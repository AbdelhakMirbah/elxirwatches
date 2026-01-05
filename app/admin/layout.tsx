import { signOut } from '@/auth';
import Link from 'next/link';
import { Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-black-rich text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-black-rich z-10">
                <h2 className="font-serif text-2xl font-bold mb-10 text-gold">ELXIR ADMIN</h2>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded transition text-gray-300 hover:text-white">
                        <ShoppingCart size={20} /> Commandes
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded transition text-gray-300 hover:text-white">
                        <Package size={20} /> Produits
                    </Link>
                </nav>

                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded transition mt-auto">
                        <LogOut size={20} /> Déconnexion
                    </button>
                </form>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
