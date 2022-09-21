import { Tenant, User } from "@prisma/client";
import { DefaultUser } from "next-auth";
import prisma from "src/libs/prisma";

export const createTenantForNewUser = async (user: User | DefaultUser): Promise<Tenant> => {
  let tenant = await prisma.tenant.findFirst({
    where: {
      users: { some: { userId: user?.id } }
    }
  });
  if (!tenant) {
    const newTenant = await prisma.tenant.create({
      data: {
        name: 'My-Tenant',
        slug: 'mytenant',
        plan: 'FREE',
        users: {
          create: {
            userId: user?.id ?? '',
            role: 'OWNER',
          }
        },
      }
    });
    tenant = newTenant;
  }

  return tenant;
}

export const getUserTenants = async (userId: string): Promise<Tenant[]> => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: { tenants: { include: { tenant: {} } } }
  });

  const tenants = user?.tenants.map(t => t.tenant);
  return tenants ?? [];
}

export default {
  createTenantForNewUser,
  getUserTenants,
};
