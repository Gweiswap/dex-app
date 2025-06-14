import { ChainId } from '@pancakeswap/chains'

import { StableSwapPool } from './types'
import { pools as bscPools } from './56'
import { pools as bscTestnetPools } from './97'
import { pools as blastPools } from './168587773'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const isStableSwapSupported = (chainId: number | undefined): chainId is StableSupportedChainId => {
  if (!chainId) {
    return false
  }
  return STABLE_SUPPORTED_CHAIN_IDS.includes(chainId)
}

export const STABLE_SUPPORTED_CHAIN_IDS = [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.BLAST_TESTNET] as const

export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number]

export const STABLE_POOL_MAP = {
  [ChainId.BSC]: bscPools,
  [ChainId.BSC_TESTNET]: bscTestnetPools,
  [ChainId.BLAST_TESTNET]: blastPools,
} satisfies StableSwapPoolMap<StableSupportedChainId>
