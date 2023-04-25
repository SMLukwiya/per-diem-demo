import { prisma } from "@/server/db";

export async function setup() {
  const createUser = prisma.user.create({
    data: {
      name: "Tester Tester",
      email: "tester@test-all.com",
    },
  });

  const [user] = await Promise.all([createUser]);
  return { user };
}

export async function teardown() {
  return Promise.all([
    prisma.user.deleteMany(),
    prisma.restaurant.deleteMany(),
    prisma.menu.deleteMany(),
    prisma.menuItem.deleteMany(),
  ]);
}
