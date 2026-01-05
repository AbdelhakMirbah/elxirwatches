'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/auth.actions';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-rich">
            <div className="w-full max-w-md p-8 space-y-8 bg-black-card border border-white/10 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="font-serif text-3xl font-bold text-white mb-2">ELXIR ADMIN</h1>
                    <p className="text-gray-400 text-sm">Veuillez vous connecter pour accéder au tableau de bord</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-black-rich border border-white/10 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="admin@elxir.ma"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-black-rich border border-white/10 rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••"
                            required
                            minLength={6}
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        className="w-full flex justify-center py-4 bg-gold text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition duration-300 disabled:opacity-50"
                        aria-disabled={isPending}
                        type="submit"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : "Se Connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}
