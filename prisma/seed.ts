import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Administrador";

  if (!email || !password) {
    throw new Error("Definí ADMIN_EMAIL y ADMIN_PASSWORD en .env");
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  });

  console.log(`Admin listo: ${email}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
