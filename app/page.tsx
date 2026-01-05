import LandingPage from '@/components/LandingPage';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await prisma.product.findMany({
    // take: 50, // Show all logic
    orderBy: { createdAt: 'desc' }
  });

  return <LandingPage products={products} />;
}
