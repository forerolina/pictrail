import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/app', '/settings']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (!isProtected) return NextResponse.next()

  const sessionToken =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value

  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/app/:path*', '/settings/:path*'],
}
