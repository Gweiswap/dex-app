import { YEAR_IN_SECONDS } from '@pancakeswap/utils/getTimePeriods'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { yantraMasterABI } from 'config/abi/IYantraMaster'
import { yantraYieldBoosterABI } from 'config/abi/IYantraYieldBooster'
import { nftPoolABI } from 'config/abi/nftPool'
import { YANTRA_MASTER, YIELD_BOOSTER_ADDRESS } from 'config/constants/yantra'
import { useEffect, useState } from 'react'
import { getContractArrayResult, getContractResult } from 'utils/yantraHelper'
import { useAccount, useContractReads } from 'wagmi'

export const useFsNFTAprs = (nftPoolId, yantraPrice, lpPrice, nftId = '0', lockDuration = '0', amount = 0) => {
  const { address: account } = useAccount()
  const [apr, setApr] = useState<number | undefined>(undefined)
  const [lockBonusAPR, setLockBonusApr] = useState<number | undefined>(undefined)
  const [boostBonusApr, setBoostBonusApr] = useState<number | undefined>(undefined)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        // 2
        address: YANTRA_MASTER,
        abi: yantraMasterABI,
        functionName: 'getPoolInfo',
        args: [nftPoolId],
      },
      {
        // 3
        address: nftPoolId,
        abi: nftPoolABI,
        functionName: 'getPoolInfo',
      },
      {
        address: nftPoolId,
        abi: nftPoolABI,
        functionName: 'getMultiplierByLockDuration',
        args: [parseUnits(lockDuration, 0)],
      },
      {
        address: YIELD_BOOSTER_ADDRESS,
        abi: yantraYieldBoosterABI,
        functionName: 'getUserPositionAllocation',
        args: [account as `0x${string}`, nftPoolId, parseUnits(nftId, 0)],
      },
    ],
  })

  useEffect(() => {
    if (!contractResult) return
    if (!lpPrice) return
    const poolEmissionRate = getContractArrayResult(contractResult[0], 4)
    const totalDepositAmount = getContractArrayResult(contractResult[1], 5)

    if (!totalDepositAmount) return
    const _apr = ((poolEmissionRate * yantraPrice) / (totalDepositAmount * lpPrice)) * YEAR_IN_SECONDS * 100
    setApr(_apr)

    const _lockBonusAPR = (_apr * getContractResult(contractResult[2], 0)) / 10000
    setLockBonusApr(_lockBonusAPR)

    const _boostBonusAPR =
      lpPrice === 0 || amount === 0
        ? 0
        : ((getContractResult(contractResult[3]) * yantraPrice) / Number(amount) / lpPrice) * 100
    setBoostBonusApr(_boostBonusAPR)
  }, [contractResult, yantraPrice, lpPrice, amount])

  return {
    apr,
    lockBonusAPR,
    boostBonusApr,
  }
}
