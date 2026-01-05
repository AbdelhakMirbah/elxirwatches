
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Category } from '@prisma/client';

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const stock = parseInt(formData.get('stock') as string);
    const category = formData.get('category') as string;
    const imageUrlsString = formData.get('imageUrls') as string;

    // Simple validation
    if (!name || !price || !category) {
        throw new Error('Missing required fields');
    }

    const images = imageUrlsString
        ? imageUrlsString.split(',').map((url) => url.trim()).filter((url) => url.length > 0)
        : [];

    try {
        await prisma.product.create({
            data: {
                name,
                brand,
                price,
                description,
                stock,
                category: category as Category,
                images: images,
                featured: false,
            }
        });
    } catch (e) {
        console.error("Failed to create product", e);
        return { error: 'Failed to create product' }
    }

    revalidatePath('/admin/products');
    revalidatePath('/collection/homme');
    revalidatePath('/collection/femme');
    revalidatePath('/');
    redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const price = parseFloat(formData.get('price') as string);
    const description = formData.get('description') as string;
    const stock = parseInt(formData.get('stock') as string);
    const category = formData.get('category') as string;
    const imageUrlsString = formData.get('imageUrls') as string;

    const images = imageUrlsString
        ? imageUrlsString.split(',').map((url) => url.trim()).filter((url) => url.length > 0)
        : [];

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                brand,
                price,
                description,
                stock,
                category: category as Category,
                images: images,
            }
        });
    } catch (e) {
        return { error: 'Failed to update product' }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/product/${id}`);
    revalidatePath('/');
    redirect('/admin/products');
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({ where: { id } });
        revalidatePath('/admin/products');
    } catch (e) {
        return { error: 'Failed to delete product' };
    }
}
