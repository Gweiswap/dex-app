import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { DIVIDENDS_ADDRESS, LAUNCHPAD_ADDRESS, XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useEffect, useState } from 'react'
import { getContractResult } from 'utils/yantraHelper'
import { useAccount, useChainId, useContractReads } from 'wagmi'
import { yantraLaunchpadABI } from 'config/abi/IYantraLaunchpad'

export const useLaunchpadData = () => {
  const chainId = useChainId()

  const [totalAllocated, setTotalAllocated] = useState(0)
  const [deAllocationCooldown, setDeAllocationCooldown] = useState(0)
  const [deAllocationFee, setDeAllocationFee] = useState(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        address: LAUNCHPAD_ADDRESS,
        abi: yantraLaunchpadABI,
        chainId,
        functionName: 'totalAllocation',
      },
      {
        address: LAUNCHPAD_ADDRESS,
        abi: yantraLaunchpadABI,
        chainId,
        functionName: 'deallocationCooldown',
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'usagesDeallocationFee',
        args: [LAUNCHPAD_ADDRESS],
      },
    ],
  })

  useEffect(() => {
    if (!contractResult) return

    const _totalAllocated = getContractResult(contractResult[0])
    const _deAllocationCooldown = getContractResult(contractResult[1], 0)
    const _deAllocationFee = getContractResult(contractResult[2], 2)

    setTotalAllocated(_totalAllocated)
    setDeAllocationCooldown(_deAllocationCooldown)
    setDeAllocationFee(_deAllocationFee)
  }, [contractResult])

  return {
    totalAllocated,
    deAllocationCooldown,
    deAllocationFee,
    refetchContracts,
  }
}
