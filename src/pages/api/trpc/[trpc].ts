import * as trpcNext from '@trpc/server/adapters/next';

import { createContext } from 'src/server/context';
import { appRouter } from 'src/server/routers/app';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  //@ts-ignore
  createContext: createContext,
});
