import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ productName }: { productName: string }) {
    // You should replace this number with your actual business number
    const phoneNumber = "212661664197";
    const message = encodeURIComponent(`Bonjour, je suis intéressé par la montre: ${productName}`);

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-[#25D366]/30 bg-[#25D366]/5 text-[#25D366] py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-white transition-all duration-300 flex items-center justify-center gap-4 group mt-4"
        >
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            Commander via WhatsApp
        </a>
    );
}
