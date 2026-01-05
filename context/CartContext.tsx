'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('elxir-cart');
        if (saved) {
            try {
                setCart(JSON.parse(saved));
            } catch (e) {
                console.error("Cart load error", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('elxir-cart', JSON.stringify(cart));
        }
    }, [cart, isLoaded]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === item.id);
            if (existing) {
                toast.success("Quantité mise à jour");
                // Add the new quantity to existing
                return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p);
            }
            toast.success("Ajouté au panier");
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart(prev => prev.map(p => p.id === id ? { ...p, quantity } : p));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('elxir-cart');
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
