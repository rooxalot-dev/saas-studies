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
  .mutation('delete-link', {
    input: object({
      linkId: string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const deletedLink = await prisma.link.delete({
          where: {
            id: input.linkId
          }
        });
        return deletedLink;
      } catch (error) {
        const errorObj = error as Error;
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: errorObj.message,
        });
      }
    },
  })
