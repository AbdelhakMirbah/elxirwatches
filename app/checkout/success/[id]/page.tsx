import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-[#111] p-8 md:p-12 border border-white/5 text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="text-green-500" size={40} />
                </div>

                <h1 className="text-3xl font-serif text-white mb-4">Merci !</h1>
                <p className="text-gray-400 mb-2">Votre commande a été confirmée.</p>
                <p className="text-white/60 text-sm mb-8">Numéro de commande: <span className="text-gold font-mono">#{id.slice(-6).toUpperCase()}</span></p>

                <p className="text-xs text-gray-500 mb-8 leading-relaxed">
                    Vous recevrez un appel de confirmation dans les prochaines 24 heures pour valider votre livraison.
                </p>

                <Link
                    href="/"
                    className="block w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
