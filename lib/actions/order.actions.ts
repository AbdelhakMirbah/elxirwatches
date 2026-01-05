'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createOrder(prevState: any, formData: FormData) {
    const customerName = formData.get('customerName') as string;
    const customerPhone = formData.get('customerPhone') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const cartItemsString = formData.get('cartItems') as string;

    if (!customerName || !customerPhone || !address || !city || !cartItemsString) {
        return { error: 'Veuillez remplir tous les champs obligatoires', success: false };
    }

    const cartItems = JSON.parse(cartItemsString);

    let total = 0;
    const orderItemsData = cartItems.map((item: any) => {
        total += item.price * item.quantity;
        return {
            productId: item.id,
            quantity: item.quantity
        };
    });

    try {
        const order = await prisma.order.create({
            data: {
                customerName,
                customerPhone,
                address,
                city,
                total,
                status: 'PENDING',
                items: {
                    create: orderItemsData
                }
            }
        });

        return { success: true, orderId: order.id, error: '' };
    } catch (e) {
        console.error("Order creation failed:", e);
        return { error: "Une erreur est survenue lors de la commande. Veuillez réessayer.", success: false };
    }
}

export async function updateTracking(formData: FormData) {
    const orderId = formData.get('orderId') as string;
    const trackingNumber = formData.get('trackingNumber') as string;

    if (!orderId || !trackingNumber) return;

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: {
                trackingNumber,
                status: 'SHIPPED'
            }
        });
    } catch (e) {
        console.error("Failed to update tracking", e);
    }

    revalidatePath('/admin');
}
