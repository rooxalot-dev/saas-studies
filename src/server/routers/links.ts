import { createRouter } from "@server/createRouter";
import { object, string, number } from 'yup';

import prisma from '@libs/prisma';
import { TRPCError } from "@trpc/server";
import { Link } from "@prisma/client";
import { IPageable } from "src/models/Pageable";

export const linkRouter = createRouter()
  .query('pageable.get-by-tenant', {
    input: object({
      tenantId: string().required(),
      page: number().optional().nullable(true),
      size: number().optional().nullable(true),
    }),
    resolve: async ({ ctx, input }) => {
      const { tenantId } = input;
      let { page, size } = input;

      if (!page) {
        page = 1;
      }

      if (!size) {
        size = 5;
      }

      const countLinks = async () => {
        const count = await prisma.link.count({
          where: {
            tenantId: {
              equals: tenantId,
            }
          },
        });

        return count;
      }

      const getLinks = async (page: number, size: number) => {
        const links = await prisma.link.findMany({
          skip: (page - 1) * size,
          take: size,
          where: {
            tenantId: {
              equals: tenantId,
            }
          },
        });

        return links;
      }

      const [count, links] = await Promise.all<[
        Promise<number>,
        Promise<Link[]>,
      ]>([
        countLinks(),
        getLinks(page, size)
      ]);



      const pageableLinks: IPageable<Link[]> = {
        data: links,
        totalRecords: count,
        totalPages: Math.ceil(count / size)
      };

      return pageableLinks;
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
