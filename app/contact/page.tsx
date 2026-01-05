import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata = {
    title: 'Contactez-nous | ElxirWatches',
    description: 'Besoin d\'aide ? Contactez notre service client.',
};

export default function ContactPage() {
    return (
        <div className="bg-black min-h-screen pt-32 pb-24 px-4 md:px-8 flex items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Information */}
                <div>
                    <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Service Client</span>
                    <h1 className="font-serif text-4xl text-white mb-8">Contactez-nous</h1>
                    <p className="text-gray-400 leading-relaxed mb-12">
                        Une question sur une montre ? Besoin d'assistance pour votre commande ?
                        Notre équipe est disponible 7j/7 pour vous accompagner.
                    </p>

                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold flex-shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-lg mb-1">Téléphone & WhatsApp</h3>
                                <p className="text-gray-500 text-sm mb-2">Disponible de 9h à 20h</p>
                                <a href="https://wa.me/212600000000" className="text-white hover:text-gold transition font-mono">+212 6 00 00 00 00</a>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold flex-shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-lg mb-1">Email</h3>
                                <p className="text-gray-500 text-sm mb-2">Réponse sous 24h</p>
                                <a href="mailto:contact@elxirwatches.com" className="text-white hover:text-gold transition font-mono">contact@elxirwatches.com</a>
                            </div>
                        </div>

                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold flex-shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-white font-serif text-lg mb-1">Siège</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Elxir Watches<br />
                                    Casablanca, Maroc
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ / Simple Form Placeholder */}
                <div className="bg-[#111] p-8 border border-white/5 rounded-sm">
                    <h3 className="font-serif text-xl text-white mb-6">Envoyez-nous un message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Nom" className="bg-black/50 border border-white/10 p-4 text-white outline-none focus:border-gold w-full" />
                            <input type="email" placeholder="Email" className="bg-black/50 border border-white/10 p-4 text-white outline-none focus:border-gold w-full" />
                        </div>
                        <input type="tel" placeholder="Téléphone" className="bg-black/50 border border-white/10 p-4 text-white outline-none focus:border-gold w-full" />
                        <textarea rows={4} placeholder="Votre Message..." className="bg-black/50 border border-white/10 p-4 text-white outline-none focus:border-gold w-full resize-none"></textarea>
                        <button type="submit" className="w-full bg-gold text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition">
                            Envoyer
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
