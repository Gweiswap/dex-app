import { ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { blastSepoliaTokens } from '@pancakeswap/tokens'

import { StableSwapPool } from './types'

const mockUSDB = new ERC20Token(
  ChainId.BLAST_TESTNET,
  '0x4200000000000000000000000000000000000022',
  18,
  'USDB',
  'MOCK Token',
)

export const pools: StableSwapPool[] = [
  {
    lpSymbol: 'USDB-USDC LP',
    lpAddress: '0x0c31acb790a49fb086ad3eb4f264ebaafc09062a',
    token: mockUSDB, // coins[0]
    quoteToken: blastSepoliaTokens.usdt, // coins[1]
    stableSwapAddress: '0xcbbd01247c2b93f3f66f0723e40d135913a397fa',
    infoStableSwapAddress: '0xFa37899Ece07756B1c16be60ae4eDdFf59F4d4d6',
    stableLpFee: 0.0004,
    stableLpFeeRateOfTotalFee: 0.5,
  },
]
