import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { XYANTRA_ADDRESS } from 'config/constants/yantra'
import { useEffect, useState } from 'react'
import { getContractResult } from 'utils/yantraHelper'
import { useAccount, useContractReads } from 'wagmi'

export const useAllowanceUsage = (usageAddress) => {
  const { address } = useAccount()
  const [allowanceUsage, setAllowanceUsage] = useState<number>(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
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
    setAllowanceUsage(getContractResult(contractResult[0]))
  }, [contractResult])
  return { allowanceUsage, refetchAllowance: refetchContracts }
}
