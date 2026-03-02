import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    // ── Grains ──────────────────────────────────────────────────────────────────
    {
        name: 'Premium White Maize',
        description:
            'Sun-dried white maize grains harvested at peak ripeness. Ideal for milling into corn flour, posho, or animal feed. Our maize is grown without synthetic pesticides.',
        price: 5500,
        stock: 200,
        category: 'Grains',
        images: [
            'https://images.unsplash.com/photo-1601593768799-76e3ee3b8e4e?w=800&q=80',
        ],
    },
    {
        name: 'Yellow Maize (Dried)',
        description:
            'Bright yellow corn dried to optimal moisture. Perfect for poultry feed, cornmeal, and traditional recipes. Sold per 50kg bag.',
        price: 4800,
        stock: 150,
        category: 'Grains',
        images: [
            'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=800&q=80',
        ],
    },
    {
        name: 'Sorghum (Guinea Corn)',
        description:
            'High-quality sorghum grains. Gluten-free, drought-resistant crop rich in antioxidants. Used in traditional drinks, porridge, and animal feed.',
        price: 4200,
        stock: 120,
        category: 'Grains',
        images: [
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
        ],
    },
    // ── Cassava & Processed ───────────────────────────────────────────────────
    {
        name: 'Fresh Cassava Tubers',
        description:
            'Freshly harvested cassava tubers, peeled and ready to process. High starch content, perfect for garri, fufu, and cassava flour production. Sold by the crate.',
        price: 3200,
        stock: 80,
        category: 'Cassava',
        images: [
            'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&q=80',
        ],
    },
    {
        name: 'White Garri (Fine)',
        description:
            'Freshly processed white garri, finely sieved and toasted to golden perfection. Made from premium cassava roots. Zero additives — just pure, natural garri.',
        price: 6800,
        stock: 300,
        category: 'Cassava',
        images: [
            'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
        ],
    },
    {
        name: 'Yellow Garri (Ijebu)',
        description:
            'Traditional Ijebu-style yellow garri, sour-fermented and perfectly toasted. Coarser texture with a distinctive tang. A beloved Nigerian staple.',
        price: 7500,
        stock: 250,
        category: 'Cassava',
        images: [
            'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&q=80',
        ],
    },
    {
        name: 'Cassava Flour',
        description:
            'Stone-milled cassava flour, naturally gluten-free. Can substitute wheat flour in most recipes. Excellent for baking, thickening stews, and making traditional flatbreads.',
        price: 8200,
        stock: 180,
        category: 'Cassava',
        images: [
            'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80',
        ],
    },
    // ── Fruits ────────────────────────────────────────────────────────────────
    {
        name: 'Organic Mango Bundle',
        description:
            'Hand-picked Nigerian mangoes at the height of sweetness. Varieties include Julie, Peter, and small Indian mangoes. Sold in 10kg bundles. Seasonal availability.',
        price: 4500,
        stock: 60,
        category: 'Fruits',
        images: [
            'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?w=800&q=80',
        ],
    },
    {
        name: 'Fresh Pineapples',
        description:
            'Sweet, tangy pineapples from our tropical orchard. Rich in vitamins and bromelain. Packed in crates of 12. Harvested to order for maximum freshness.',
        price: 3800,
        stock: 40,
        category: 'Fruits',
        images: [
            'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80',
        ],
    },
    {
        name: 'Ripe Plantains (Unripe Available)',
        description:
            'Premium plantains, available in both ripe (yellow) and unripe (green) stages. Grown on our Ogun State farm. Ideal for dodo, boli, and chips. Sold per bunch.',
        price: 2800,
        stock: 90,
        category: 'Fruits',
        images: [
            'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
        ],
    },
    {
        name: 'Watermelons (Farm Fresh)',
        description:
            'Jumbo watermelons, vine-ripened under the Nigerian sun. Extremely sweet with bright red flesh. Each melon averages 5–8kg. Perfect for summer hydration.',
        price: 5000,
        stock: 70,
        category: 'Fruits',
        images: [
            'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&q=80',
        ],
    },
    // ── Vegetables ───────────────────────────────────────────────────────────
    {
        name: 'Fresh Tomatoes (Crate)',
        description:
            'Fully ripened plum tomatoes, excellent for stews, soups, and sauces. Grown on natural compost, free from synthetic fertilizers. Available per crate (50kg).',
        price: 9500,
        stock: 45,
        category: 'Vegetables',
        images: [
            'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=800&q=80',
        ],
    },
    {
        name: 'Red Onions (Bag)',
        description:
            'Large, pungent red onions from our Northern Nigeria partners. Sun-dried for long shelf life. Essential for every Nigerian kitchen. Sold per 50kg bag.',
        price: 12000,
        stock: 30,
        category: 'Vegetables',
        images: [
            'https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80',
        ],
    },
    {
        name: 'Fresh Peppers (Mixed)',
        description:
            'Mixed hot peppers — tatashe, ata rodo, and shombo — harvested at full color and heat. Ideal for stews, pepper soup, and suya spice. Sold per basket.',
        price: 4200,
        stock: 55,
        category: 'Vegetables',
        images: [
            'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=800&q=80',
        ],
    },
    // ── Processed Foods ──────────────────────────────────────────────────────
    {
        name: 'Palm Oil (Unrefined)',
        description:
            'Pure, unrefined red palm oil extracted cold from fresh palm fruits. Rich in carotene and vitamin E. No additives. The backbone of West African cuisine.',
        price: 15000,
        stock: 100,
        category: 'Processed',
        images: [
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
        ],
    },
    {
        name: 'Dried Crayfish (Ground)',
        description:
            'Sun-dried, coarsely ground crayfish from our partner fishermen in Lagos State. Adds deep umami flavor to soups and stews. Allergen warning: shellfish.',
        price: 8800,
        stock: 85,
        category: 'Processed',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        ],
    },
];

async function main() {
    console.log('🌱 Seeding Tosi Farms database...');

    // Clear existing products
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    console.log('   ✓ Cleared existing products');

    // Insert products one by one to preserve order
    for (const product of products) {
        await prisma.product.create({ data: product });
        process.stdout.write(`   ✓ Created: ${product.name}\n`);
    }

    console.log(`\n🎉 Done! Seeded ${products.length} products across 5 categories.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Seeding failed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
