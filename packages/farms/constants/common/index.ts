import { ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import {
  bscTestnetTokens,
  bscTokens,
  ethereumTokens,
  goerliTestnetTokens,
  zkSyncTestnetTokens,
  polygonZkEvmTokens,
  zksyncTokens,
  arbitrumTokens,
  lineaTokens,
  baseTokens,
} from '@pancakeswap/tokens'
import type { CommonPrice } from '../../src/fetchFarmsV3'
import type { FarmV3SupportedChainId } from '../../src'

export const CAKE_BNB_LP_MAINNET = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'

export type PriceHelper = {
  chain: string
  list: ERC20Token[]
}

export const priceHelperTokens = {
  [ChainId.ETHEREUM]: {
    chain: 'ethereum',
    list: [ethereumTokens.weth, ethereumTokens.usdc, ethereumTokens.usdt],
  },
  [ChainId.BSC]: {
    chain: 'bsc',
    list: [bscTokens.wbnb, bscTokens.usdt, bscTokens.busd, bscTokens.eth],
  },
  [ChainId.POLYGON_ZKEVM]: {
    chain: 'polygon_zkevm',
    list: [polygonZkEvmTokens.weth, polygonZkEvmTokens.usdc, polygonZkEvmTokens.usdt, polygonZkEvmTokens.matic],
  },
  [ChainId.ZKSYNC]: {
    chain: 'zksync',
    list: [zksyncTokens.weth, zksyncTokens.usdc, zksyncTokens.usdt],
  },
  [ChainId.ARBITRUM_ONE]: {
    chain: 'arbitrum',
    list: [arbitrumTokens.weth, arbitrumTokens.usdc, arbitrumTokens.usdt, arbitrumTokens.arb],
  },
  [ChainId.LINEA]: {
    chain: 'linea',
    list: [lineaTokens.weth, lineaTokens.usdc, lineaTokens.usdt, lineaTokens.wbtc, lineaTokens.dai],
  },
  [ChainId.BASE]: {
    chain: 'base',
    list: [baseTokens.weth, baseTokens.usdbc, baseTokens.dai, baseTokens.cbETH, baseTokens.usdc],
  },
} satisfies Record<number, PriceHelper>

// for testing purposes
export const DEFAULT_COMMON_PRICE: Record<FarmV3SupportedChainId, CommonPrice> = {
  [ChainId.ETHEREUM]: {},
  [ChainId.GOERLI]: {
    [goerliTestnetTokens.mockA.address]: '10',
  },
  [ChainId.BSC]: {},
  [ChainId.BSC_TESTNET]: {
    [bscTestnetTokens.mockA.address]: '10',
    [bscTestnetTokens.usdt.address]: '1',
    [bscTestnetTokens.busd.address]: '1',
    [bscTestnetTokens.usdc.address]: '1',
  },
  [ChainId.ZKSYNC_TESTNET]: {
    [zkSyncTestnetTokens.mock.address]: '10',
  },
  [ChainId.POLYGON_ZKEVM]: {},
  [ChainId.ZKSYNC]: {},
  [ChainId.POLYGON_ZKEVM_TESTNET]: {},
  [ChainId.ARBITRUM_ONE]: {},
  [ChainId.LINEA]: {},
  [ChainId.BASE]: {},
  [ChainId.OPBNB_TESTNET]: {},

  [ChainId.BLAST_TESTNET]: {},
}
