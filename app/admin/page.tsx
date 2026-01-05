import { prisma } from '@/lib/prisma';
import OrdersTable from '@/components/admin/OrdersTable';
import { DollarSign, Package, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: 'CANCELLED' } }
    });

    // Average Order Value
    const aov = totalOrders > 0 ? (totalRevenue._sum.total || 0) / totalOrders : 0;

    const lowStockProducts = await prisma.product.findMany({
        where: { stock: { lte: 3 } },
        take: 5,
        select: { id: true, name: true, stock: true }
    });

    return {
        totalOrders,
        revenue: totalRevenue._sum.total || 0,
        aov,
        lowStockProducts
    };
}

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    // Fetch recent orders for the table below
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { items: { include: { product: true } } }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-white">Tableau de Bord</h1>
                <span className="text-sm text-gray-500">Aperçu en temps réel</span>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-gold/10 rounded-full text-gold">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Chiffre d'Affaires</p>
                        <h3 className="text-2xl font-bold text-white">{stats.revenue.toLocaleString()} DH</h3>
                    </div>
                </div>

                <div className="bg-black-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Commandes Totales</p>
                        <h3 className="text-2xl font-bold text-white">{stats.totalOrders}</h3>
                    </div>
                </div>

                <div className="bg-black-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Panier Moyen</p>
                        <h3 className="text-2xl font-bold text-white">{Math.round(stats.aov)} DH</h3>
                    </div>
                </div>

                <div className="bg-black-card border border-white/10 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Stock Faible</p>
                        <h3 className="text-2xl font-bold text-white">{stats.lowStockProducts.length} produits</h3>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert Section (Only if there are low stock items) */}
            {stats.lowStockProducts.length > 0 && (
                <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-lg">
                    <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} /> Attention: Stocks Critiques
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.lowStockProducts.map(p => (
                            <div key={p.id} className="flex justify-between items-center bg-black/40 p-3 rounded border border-red-500/10">
                                <span className="text-sm text-gray-300">{p.name}</span>
                                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">
                                    Reste: {p.stock}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-right">
                        <Link href="/admin/products" className="text-xs text-red-400 hover:text-red-300 underline">
                            Gérer les stocks →
                        </Link>
                    </div>
                </div>
            )}

            {/* Recent Orders Table */}
            <div>
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-serif text-white">Commandes Récentes</h2>
                    <Link href="/admin#orders" className="text-gold text-sm hover:underline">Tout voir</Link>
                </div>
                <OrdersTable orders={orders} />
            </div>
        </div>
    );
}
