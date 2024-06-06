import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeader = new Headers(request.headers)
  const pathname = request.nextUrl.pathname;
  requestHeader.set('x-url', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeader
    }
  })
}