import { createRouter } from "@server/createRouter";
import { z } from "zod";

import prisma from '@libs/prisma';
import { TRPCError } from "@trpc/server";

export const linkRouter = createRouter()
  .query('get-by-tenant', {
    input: z.object({
      tenantId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      if (!ctx.session) {
        return new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Você precisa estar logado na aplicação para esta operação!'
        });
      }

      const links = await prisma.link.findMany({
        where: {
          tenantId: input.tenantId,
        }
      });

      return links;
    },
  })
  .mutation('save-link', {
    input: z.object({
      tenantId: z.string(),
      internalName: z.string(),
      publicName: z.string(),
      slug: z.string(),
      destination: z.string(),
      internalLink: z.string().nullish(),
    }),
    resolve: async ({ ctx, input }) => {
      console.log('ctx.session', ctx.session);

      if (!ctx.session) {
        return new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Você precisa estar logado na aplicação para esta operação!'
        });
      }

      const createdLink = await prisma.link.create({ data: input });
      return createdLink;
    },
  })
