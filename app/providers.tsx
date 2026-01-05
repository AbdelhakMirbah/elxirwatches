'use client';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            {children}
            <Toaster position="top-center" theme="dark" />
        </CartProvider>
    );
}
