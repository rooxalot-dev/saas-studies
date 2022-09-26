import { z } from 'zod';
import { createRouter } from '../createRouter';
import { tenantsRouter } from './tenants';

export const appRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .merge('tenants.', tenantsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
