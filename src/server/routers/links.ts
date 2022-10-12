import { createRouter } from "@server/createRouter";
import { TRPCError } from "@trpc/server";

import { DeleteLinkSchema, LinksByTenantSchema, SaveLinkSchema } from "src/models/Link";
import { deleteLink, getLinksPage, saveLink } from "@server/services/linksService";

export const linkRouter = createRouter()
  .query('pageable.get-by-tenant', {
    input: LinksByTenantSchema,
    resolve: async ({ ctx, input }) => {
      const pageableLinks = await getLinksPage(input);
      return pageableLinks;
    },
  })
  .mutation('save-link', {
    input: SaveLinkSchema,
    resolve: async ({ ctx, input }) => {
      try {
        const createdLink = await saveLink(input);
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
    input: DeleteLinkSchema,
    resolve: async ({ ctx, input }) => {
      try {
        const deletedLink = deleteLink(input);
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
