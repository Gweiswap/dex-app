import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { DIVIDENDS_ADDRESS, XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useEffect, useMemo, useState } from 'react'
import { getContractResult, getFormattedUnits } from 'utils/yantraHelper'
import { useAccount, useChainId, useContractReads } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { distributedTokenInfo } from '../config'

interface DistributionInfo {
  name: string
  currentDistributionAmount: number
  currentDistributionAmountInUSD: number
  currentCycleDistributedAmount: number
  pendingAmount: number
  distributedAmount: number
  accDividendsPerShare: number
  lastUpdateTime: number
  cycleDividendsPercent: number
  distributionDisabled: boolean
}

export const useDistributionData = (xYantraPrice, ethUsdtLpPrice) => {
  const { address } = useAccount()
  const { chainId } = useActiveChainId()

  const [distributionData, setDistributionData] = useState<DistributionInfo[]>([])
  const [nextCycleStartTime, setnextCycleStartTime] = useState(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: useMemo(
      () =>
        distributedTokenInfo.map((item) => ({
          abi: yantraDividendsABI,
          address: DIVIDENDS_ADDRESS,
          functionName: 'dividendsInfo',
          args: [item.token],
          chainId,
        })),
      [chainId],
    ),
    cacheTime: 0,
  })

  useEffect(() => {
    if (!contractResult) return
    const _filterResult = contractResult.filter((item) => item.status === 'success')
    const _distributionData = _filterResult.map((item, index) => {
      const _cDAmount = getFormattedUnits((item.result as ArrayBuffer)[0].toString())
      return {
        name: distributedTokenInfo[index].tokenName,
        currentDistributionAmount: _cDAmount,
        currentDistributionAmountInUSD: _cDAmount * (index === 0 ? xYantraPrice : ethUsdtLpPrice),
        currentCycleDistributedAmount: getFormattedUnits((item.result as ArrayBuffer)[1]),
        pendingAmount: getFormattedUnits((item.result as ArrayBuffer)[2]),
        distributedAmount: getFormattedUnits((item.result as ArrayBuffer)[3]),
        accDividendsPerShare: getFormattedUnits((item.result as ArrayBuffer)[4]),
        lastUpdateTime: getFormattedUnits((item.result as ArrayBuffer)[5], 0),
        cycleDividendsPercent: getFormattedUnits((item.result as ArrayBuffer)[6], 0),
        distributionDisabled: (item.result as ArrayBuffer)[7],
      }
    })
    setDistributionData(_distributionData)
  }, [contractResult, xYantraPrice, ethUsdtLpPrice])

  const { data: contractResult1 } = useContractReads({
    contracts: [
      {
        address: DIVIDENDS_ADDRESS,
        abi: yantraDividendsABI,
        chainId,
        functionName: 'nextCycleStartTime',
      },
    ],
  })

  useEffect(() => {
    if (!contractResult1) return
    setnextCycleStartTime(getContractResult(contractResult1[0], 0))
  }, [contractResult1])

  return {
    distributionData,
    nextCycleStartTime,
    refetchContracts,
  }
}
