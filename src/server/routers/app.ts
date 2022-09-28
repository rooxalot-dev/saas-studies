import { createRouter } from '../createRouter';
import { linkRouter } from './links';
import { tenantsRouter } from './tenants';

export const appRouter = createRouter()
  .merge('tenants.', tenantsRouter)
  .merge('links.', linkRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
