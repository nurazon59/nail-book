import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// プレースホルダー画像のURL
const PLACEHOLDER_IMAGE_URL = 'https://placehold.jp/300x200.png';

async function main() {
  // Create brands
  const brands = await prisma.brand.createMany({
    data: [
      { name: 'Brand A' },
      { name: 'Brand B' },
    ],
  });

  // Fetch the created brands
  const [brand1, brand2] = await prisma.brand.findMany();

  // Create base coats
  const baseCoats = await prisma.baseCoat.createMany({
    data: [
      { name: 'Base Coat A', brandId: brand1.id, image: PLACEHOLDER_IMAGE_URL },
      { name: 'Base Coat B', brandId: brand2.id, image: PLACEHOLDER_IMAGE_URL },
    ],
  });

  // Create top coats
  const topCoats = await prisma.topCoat.createMany({
    data: [
      { name: 'Top Coat A', brandId: brand1.id, image: PLACEHOLDER_IMAGE_URL },
      { name: 'Top Coat B', brandId: brand2.id, image: PLACEHOLDER_IMAGE_URL },
    ],
  });

  // Create art nails
  const artNails = await prisma.artNail.createMany({
    data: [
      { name: 'Art Nail A', genre: 'Floral', brandId: brand1.id, image: PLACEHOLDER_IMAGE_URL },
      { name: 'Art Nail B', genre: 'Abstract', brandId: brand2.id, image: PLACEHOLDER_IMAGE_URL },
    ],
  });

  // Create color nails
  const colorNails = await prisma.colorNail.createMany({
    data: [
      { name: 'Color Nail A', genre: 'Pastel', brandId: brand1.id, image: PLACEHOLDER_IMAGE_URL },
      { name: 'Color Nail B', genre: 'Metallic', brandId: brand2.id, image: PLACEHOLDER_IMAGE_URL },
    ],
  });

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'User A',
      email: 'userA@example.com',
      admin: true,
      nailSets: {
        create: [
          {
            title: 'Nail Set 1',
            image: PLACEHOLDER_IMAGE_URL,
            base: 'Pink',
            nails: {
              create: [
                {
                  finger: 'Thumb',
                  baseId: (await prisma.baseCoat.findFirst({ where: { name: 'Base Coat A' } }))?.id || '',
                  colorId: (await prisma.colorNail.findFirst({ where: { name: 'Color Nail A' } }))?.id || '',
                  artId: (await prisma.artNail.findFirst({ where: { name: 'Art Nail A' } }))?.id || '',
                  topId: (await prisma.topCoat.findFirst({ where: { name: 'Top Coat A' } }))?.id || '',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
