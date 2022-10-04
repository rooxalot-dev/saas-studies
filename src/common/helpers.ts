import { NextRouter } from "next/router";

export const getTenantIdFromRouter = (router: NextRouter) => {
  const { query } = router;
  const tenantId = (query.tenantId ?? '') as string;

  return tenantId;
};
