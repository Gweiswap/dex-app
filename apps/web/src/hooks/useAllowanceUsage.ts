import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useXYantraContract } from 'hooks/useContract1'
import { useCallback, useEffect, useState } from 'react'
import { getContractResult } from 'utils/yantraHelper'
import { useAccount, useContractReads } from 'wagmi'

const options = {}

const approveUsage = async (xYantraContract, address, amountToAllocate) => {
  return xYantraContract.write.approveUsage([address, amountToAllocate], { ...options })
}

export const useAllowanceUsage = (usageAddress) => {
  const { address } = useAccount()
  const [allowance, setAllowance] = useState<number>(0)
  const [allowanceUsage, setAllowanceUsage] = useState<number>(0)
  const xYantraContract = useXYantraContract()

  const handleApproveUsage = useCallback(
    async (amountToApprove) => {
      return approveUsage(xYantraContract, usageAddress, amountToApprove)
    },
    [xYantraContract, usageAddress],
  )

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        functionName: 'allowance',
        args: [address as `0x${string}`, XYANTRA_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        functionName: 'usageApprovals',
        args: [address as `0x${string}`, usageAddress],
      },
    ],
  })

  useEffect(() => {
    if (!contractResult) return
    setAllowance(getContractResult(contractResult[0]))
    setAllowanceUsage(getContractResult(contractResult[1]))
  }, [contractResult])

  return { allowanceUsage, allowance, refetchAllowance: refetchContracts, handleApproveUsage }
}
