import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const {pathname} = request.nextUrl;

  const isCreateRoute= pathname.startsWith('/create');
  const isLoginRoute = pathname === '/login';
  const isRegisterRoute = pathname === '/register';

  if (isCreateRoute && !token) return NextResponse.redirect(new URL('/login', request.url))

  if (isLoginRoute && token) return NextResponse.redirect(new URL('/', request.url))

  if (isRegisterRoute && token) return NextResponse.redirect(new URL('/', request.url))

  return NextResponse.next()
  
}

export const config = {
  matcher: [ '/create' , '/login', '/register'],
}