
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Category } from '@prisma/client';

const SEED_WATCHES = [
    // --- CASIO ---
    {
        name: "Casio Vintage Édition Dorée A168",
        brand: "Casio",
        price: 890,
        oldPrice: 1200,
        images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Le style rétro intemporel. Affichage numérique, bracelet en acier inoxydable doré, chronomètre et éclairage LED."
    },
    {
        name: "Casio Edifice Chronograph Black",
        brand: "Casio",
        price: 1800,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Une montre sportive et élégante. Boîtier en acier massif, étanche 100m, chronographe précis à la seconde."
    },
    {
        name: "Casio G-Shock Military Green",
        brand: "Casio",
        price: 1500,
        oldPrice: 1900,
        images: ["https://images.unsplash.com/photo-1623998021446-45cd9b269056?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Résistance absolue. Structure antichoc, étanchéité 200m et autonomie longue durée."
    },

    // --- FESTINA ---
    {
        name: "Festina Classics Bleu Nuit",
        brand: "Festina",
        price: 2400,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1510672728478-f31627c2f689?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "L'élégance pure. Cadran bleu nuit avec index argentés, bracelet cuir véritable."
    },
    {
        name: "Festina Chrono Bike Acier",
        brand: "Festina",
        price: 3200,
        oldPrice: 4000,
        images: ["https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Inspirée du cyclisme. Chronographe sportif avec boîtier robuste en acier inoxydable 316L."
    },
    {
        name: "Festina Mademoiselle Swarovski",
        brand: "Festina",
        price: 2100,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800&auto=format&fit=crop"],
        category: "FEMME",
        description: "Ornée de cristaux scintillants. Une touche de glamour pour votre poignet."
    },

    // --- DANIEL HECHTER ---
    {
        name: "Daniel Hechter Skeleton Automatique",
        brand: "Daniel Hechter",
        price: 3900,
        oldPrice: 5500,
        images: ["https://images.unsplash.com/photo-1622434641406-a15810545123?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Mécanisme apparent. Boîtier doré rose et bracelet cuir marron, l'alliance du classique et du moderne."
    },
    {
        name: "Daniel Hechter Atlas Chrono",
        brand: "Daniel Hechter",
        price: 2800,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Style urbain chic. Cadran épuré avec sous-compteurs discrets."
    },

    // --- JAGUAR ---
    {
        name: "Jaguar Executive Diver Green",
        brand: "Jaguar",
        price: 6500,
        oldPrice: 7200,
        images: ["https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Plongée de luxe. Verre saphir, étanche 200m, lunette céramique verte rotative."
    },
    {
        name: "Jaguar Hybrid Smartwatch",
        brand: "Jaguar",
        price: 5900,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1495856458515-0637185db551?q=80&w=800&auto=format&fit=crop"],
        category: "HOMME",
        description: "Technologie connectée dans un corps classique. Notifications, suivi d'activité et contrôle de musique."
    },
    // --- ACCESSOIRES ---
    {
        name: "Coffret Luxe 6 Montres - Bois Laqué",
        brand: "Elxir Accessories",
        price: 890,
        oldPrice: 1200,
        images: ["https://images.unsplash.com/photo-1590422749818-7278d652bf10?q=80&w=800&auto=format&fit=crop"],
        category: "ACCESSOIRES",
        description: "Protégez votre collection avec ce coffret en bois laqué noir. Intérieur velours doux, vitrine en verre."
    },
    {
        name: "Kit de Nettoyage Premium",
        brand: "Elxir Care",
        price: 250,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1622434641406-a15810545123?q=80&w=800&auto=format&fit=crop"], // Placeholder for kit
        category: "ACCESSOIRES",
        description: "Tout le nécessaire pour entretenir l'éclat de vos montres. Spray nettoyant, chiffon microfibre et brosse douce."
    },
    {
        name: "Bracelet Cuir Italien Marron 20mm",
        brand: "Elxir Straps",
        price: 450,
        oldPrice: 0,
        images: ["https://images.unsplash.com/photo-1542840410-3092f4761969?q=80&w=800&auto=format&fit=crop"], // Placeholder strap
        category: "ACCESSOIRES",
        description: "Cuir véritable pleine fleur, surpiqûres beiges. Compatible avec la plupart des montres."
    },
    {
        name: "Remontoir Automatique Single",
        brand: "Wolf",
        price: 1800,
        oldPrice: 2200,
        images: ["https://images.unsplash.com/photo-1585123334904-845d60e65b28?q=80&w=800&auto=format&fit=crop"], // Placeholder winder
        category: "ACCESSOIRES",
        description: "Gardez votre montre automatique à l'heure. Moteur silencieux japonais, plusieurs modes de rotation."
    }
];

export async function GET() {
    try {
        let count = 0;

        for (const product of SEED_WATCHES) {
            const existing = await prisma.product.findFirst({ where: { name: product.name } });

            if (!existing) {
                await prisma.product.create({
                    data: {
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        oldPrice: product.oldPrice > 0 ? product.oldPrice : null,
                        description: product.description,
                        images: product.images,
                        category: product.category as Category,
                        stock: 10,
                        featured: true
                    }
                });
                count++;
            }
        }

        return NextResponse.json({
            message: "Brand seeding complete",
            added: count,
            total_brands: ["Casio", "Festina", "Daniel Hechter", "Jaguar"]
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
    }
}
