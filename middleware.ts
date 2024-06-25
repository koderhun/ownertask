import {NextResponse, NextRequest} from 'next/server'
import {verifyJwtToken} from '@/libs/auth'
import type {JWTPayload} from 'jose'

const AUTH_PAGES: string[] = []

const isAuthPages = (url: string): boolean =>
  AUTH_PAGES.some((page) => page.startsWith(url))

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const {url, nextUrl, cookies} = request
  const {value: token} = cookies.get('token') ?? {value: null}

  const hasVerifiedToken: "" | JWTPayload | null = token && (await verifyJwtToken(token))
  
  const isAuthPageRequested: boolean = isAuthPages(nextUrl.pathname)

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response: NextResponse = NextResponse.next()
      response.cookies.delete('token')
      return response
    }

    const response: NextResponse = NextResponse.redirect(new URL(`/`, url))
    return response
  }

  if (!hasVerifiedToken) {
    const searchParams: URLSearchParams = new URLSearchParams(
      nextUrl.searchParams
    )
    searchParams.set('next', nextUrl.pathname)

    const response: NextResponse = NextResponse.redirect(
      new URL(`?${searchParams}`, url)
    )
    response.cookies.delete('token')

    return response
  }

  return NextResponse.next()
}

export const config = {matcher: ['/coins', '/profile/:path*']}
