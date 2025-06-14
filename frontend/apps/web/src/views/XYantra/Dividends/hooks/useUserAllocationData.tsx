import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { DIVIDENDS_ADDRESS, XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useEffect, useState } from 'react'
import { getContractResult, getFormattedUnits } from 'utils/yantraHelper'
import { useAccount, useChainId, useContractReads } from 'wagmi'

export const useUserAllocationData = () => {
  const { address } = useAccount()
  const chainId = useChainId()

  const [allocated, setAllocated] = useState(0)
  const [manualAllocation, setManualAllocation] = useState(0)
  const [redeemAllocation, setRedeemAllocation] = useState(0)
  const [xYantraBalance, setXYantraBalance] = useState(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        address: DIVIDENDS_ADDRESS,
        abi: yantraDividendsABI,
        chainId,
        functionName: 'usersAllocation',
        args: [address as `0x${string}`],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'xYantraBalances',
        args: [address as `0x${string}`],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'redeemDividendsAdjustment',
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
    ],
  })

  useEffect(() => {
    if (!contractResult) return
    if (
      contractResult[2].status === 'success' &&
      contractResult[1].status === 'success' &&
      contractResult[0].status === 'success'
    ) {
      const _totalAllocation = getFormattedUnits(contractResult[0].result)
      const _redeemingAmount = getFormattedUnits(contractResult[1].result[1])
      const _redeemDividendsAdjustment = getFormattedUnits(contractResult[2].result, 0)
      const _redeemingAllocation = (_redeemingAmount * _redeemDividendsAdjustment) / 100
      setManualAllocation(_totalAllocation - _redeemingAllocation)
      setRedeemAllocation(_redeemingAllocation)
      setAllocated(_totalAllocation)
    }
    setXYantraBalance(getContractResult(contractResult[3]))
  }, [contractResult])

  return {
    allocated,
    manualAllocation,
    redeemAllocation,
    xYantraBalance,
    refetchContracts,
  }
}
