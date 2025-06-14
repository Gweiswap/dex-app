import { describe, it, expect } from 'vitest'
import { CORS_ALLOW, isOriginAllowed } from './index'

describe('worker-utils', () => {
  it.each([
    ['https://yantra.exchange', true],
    ['https://pancakeswap.com', true],
    ['https://aptoxyantra.exchange', false],
    ['https://aptos.yantra.exchange', true],
    ['https://yantra.exchange.com', false],
    ['http://yantra.exchange', false],
    ['https://pancake.run', false],
    ['https://test.pancake.run', true],
    ['http://localhost:3000', true],
    ['http://localhost:3001', true],
  ])(`isOriginAllowed(%s)`, (origin, expected) => {
    expect(isOriginAllowed(origin, CORS_ALLOW)).toBe(expected)
  })
})
