import { shouldGeoBlock } from '@pancakeswap/utils/geoBlock'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (shouldGeoBlock(req.geo)) {
    return NextResponse.redirect(new URL('/451', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',
    '/swap',
    '/liquidity',
    '/pools',
    '/add',
    '/ifo',
    '/remove',
    '/find',
    '/info/:path*',

    '/positions',
    '/hyperpools',
    '/xyantra',
    '/dividends',
    '/launchpad',
    '/booster',
    '/gauge',
    '/analytics',
  ],
}
