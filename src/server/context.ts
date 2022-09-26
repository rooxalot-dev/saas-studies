import { nextAuthOptions } from "@pages/api/auth/[...nextauth]";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { Session, unstable_getServerSession } from "next-auth";

type AppSession = Session & {
  user: {
    id?: string;
  }
};

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getSession() {
    if (opts) {
      const { req, res } = opts;
      const session = await unstable_getServerSession(req, res, nextAuthOptions) as AppSession | null;
      return session;
    } else {
      return null;
    }
  }

  const session = await getSession();
  return {
    req: opts?.req,
    res: opts?.res,
    session,
  };
}

export type AppContext = trpc.inferAsyncReturnType<typeof createContext>;
