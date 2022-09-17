// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Tenant } from '@prisma/client';
import prisma from 'libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tenant[]>
) {
  const tenants = await prisma?.tenant.findMany() ?? [];
  res.status(200).json(tenants);
}
