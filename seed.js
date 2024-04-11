// seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create stores
  const store1 = await prisma.store.create({
    data: {
      name: 'Store 1',
      location: 'Location 1'
    }
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Store 2',
      location: 'Location 2'
    }
  });

  // Create discounts
  const discount1 = await prisma.discount.create({
    data: {
      name: 'Discount 1',
      description: 'Description 1',
      storeId: store1.id,
      qrCode: 'QR Code 1'
    }
  });

  const discount2 = await prisma.discount.create({
    data: {
      name: 'Discount 2',
      description: 'Description 2',
      storeId: store2.id,
      qrCode: 'QR Code 2'
    }
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com'
    }
  });

  // Create claims
  const claim1 = await prisma.claim.create({
    data: {
      userId: user1.id,
      discountId: discount1.id,
      claimedAt: new Date()
    }
  });

  const claim2 = await prisma.claim.create({
    data: {
      userId: user2.id,
      discountId: discount2.id,
      claimedAt: new Date()
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
