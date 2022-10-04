import { createRouter } from "@server/createRouter";
import { object, string, number, date, InferType } from 'yup';

import prisma from '@libs/prisma';
import { TRPCError } from "@trpc/server";

export const linkRouter = createRouter()
  .query('get-by-tenant', {
    input: object({
      tenantId: string().required(),
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
    input: object({
      tenantId: string().required('TenantId obrigatório'),
      internalName: string().required('Nome interno obrigatório'),
      publicName: string().required('Nome público obrigatório'),
      slug: string().required('Slug obrigatório'),
      destination: string().required('Destino obrigatório'),
      internalLink: string().optional(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        if (!ctx.session) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Você precisa estar logado na aplicação para esta operação!'
          });
        }

        const createdLink = await prisma.link.create({ data: input });
        return createdLink;
      } catch (error) {
        const errorObj = error as Error;
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: errorObj.message,
        });
      }
    },
  })
