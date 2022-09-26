// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tenant } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { getUserTenants } from 'src/server/services/tenantService';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Tenant[] | {}>) {
  const session = await getSession({ req });
  if (session) {
    //@ts-ignore
    const userId = (session?.user.id ?? '') as string;

    const tenants = await getUserTenants(userId);
    res.status(200).json(tenants);
  } else {
    res.status(500).json({
      error: 'Session not set'
    });
  }
}

