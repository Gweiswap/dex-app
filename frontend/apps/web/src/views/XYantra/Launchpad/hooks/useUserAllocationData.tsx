import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { yantraLaunchpadABI } from 'config/abi/IYantraLaunchpad'
import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { DIVIDENDS_ADDRESS, LAUNCHPAD_ADDRESS, XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useEffect, useState } from 'react'
import { getContractResult, getFormattedUnits } from 'utils/yantraHelper'
import { useAccount, useChainId, useContractReads } from 'wagmi'

export const useUserAllocationData = () => {
  const { address } = useAccount()
  const chainId = useChainId()

  const [allocated, setAllocated] = useState(0)
  const [allocatedTime, setAllocatedTime] = useState(0)
  const [xYantraBalance, setXYantraBalance] = useState(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        address: LAUNCHPAD_ADDRESS,
        abi: yantraLaunchpadABI,
        chainId,
        functionName: 'getUserInfo',
        args: [address as `0x${string}`],
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
    if (contractResult[1].status === 'success' && contractResult[0].result) {
      const _allocated = getFormattedUnits(contractResult[0].result[0])
      const _allocatedTime = getFormattedUnits(contractResult[0].result[1], 0)
      setAllocated(_allocated)
      setAllocatedTime(_allocatedTime)
    }
    setXYantraBalance(getContractResult(contractResult[1]))
  }, [contractResult])

  return {
    allocated,
    allocatedTime,
    xYantraBalance,
    refetchContracts,
  }
}
