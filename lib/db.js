import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const db = globalThis.prisma || new PrismaClient();

export async function findUserByEmail(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && await bcrypt.compare(password, user.password)) {
    return { id: user.id, email: user.email };
  }

  return null;
}


if (process.env.NODE_ENV !== "production")
{
  globalThis.prisma == db;
}



export default db;

