import { WETH9 } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { USDC, USDT, YANTRA, DAI } from './common'

export const blastSepoliaTokens = {
  weth: WETH9[ChainId.BLAST_TESTNET],
  // usdc: USDC[ChainId.BLAST_TESTNET],
  usdt: USDT[ChainId.BLAST_TESTNET],
  yantra: YANTRA[ChainId.BLAST_TESTNET],
}
