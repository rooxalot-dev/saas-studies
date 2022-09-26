import { createRouter } from "../createRouter";
import { getUserTenants } from "../services/tenantService";

export const tenantsRouter = createRouter()
  .query('get-my-tenants', {
    resolve: async ({ ctx }) => {
      const { session } = ctx;
      const userId = (session?.user.id ?? '') as string;
      const tenants = await getUserTenants(userId);

      return tenants;
    },
  });

