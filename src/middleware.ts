import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const secret = process.env.APP_SECRET as string;
  const token = await getToken({ req: request, secret });
  const tenantIds = (token?.tenantIds || []) as Array<string>;

  if (!token) {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  const requestToTenantList = request.nextUrl.pathname === '/app';
  if (requestToTenantList && tenantIds.length === 1) {
    const [tenantId] = tenantIds;
    return NextResponse.rewrite(new URL(`/app/${tenantId}`, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}
