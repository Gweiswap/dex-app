import { yantraTokenABI } from 'config/abi/IYantraToken'
import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { yantraMasterABI } from 'config/abi/IYantraMaster'
import { yantraNftFactoryABI } from 'config/abi/IYantraNftFactory'
import { yantraYieldBoosterABI } from 'config/abi/IYantraYieldBooster'
import { yantraLaunchpadABI } from 'config/abi/IYantraLaunchpad'
import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { positionHelperABI } from 'config/abi/IPositionHelper'

import {
  YANTRA_ADDRESS,
  XYANTRA_ADDRESS,
  YANTRA_MASTER,
  NFT_POOL_FACTORY_ADDRESS,
  YIELD_BOOSTER_ADDRESS,
  DIVIDENDS_ADDRESS,
  LAUNCHPAD_ADDRESS,
  POSITION_HELPER_ADDRESS,
} from 'config/constants/yantra'

import { useContract } from 'hooks/useContract'
import { publicClient } from './wagmi'

export function usePositionHelperContract() {
  return useContract(POSITION_HELPER_ADDRESS, positionHelperABI)
}

export function useNftFactoryContract() {
  return useContract(NFT_POOL_FACTORY_ADDRESS, yantraNftFactoryABI)
}

export async function getNftPoolAddress(chainId: number, lpAddress: `0x${string}`) {
  return publicClient({ chainId })
    .readContract({
      abi: yantraNftFactoryABI,
      address: NFT_POOL_FACTORY_ADDRESS,
      functionName: 'getPool',
      args: [lpAddress],
    })
    .then((response) => {
      return response
    })
    .catch((error) => {
      return undefined
    })
}
