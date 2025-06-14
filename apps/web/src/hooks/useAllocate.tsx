import { useCallback } from 'react'
import { useXYantraContract } from 'hooks/useContract1'
import { useAccount } from 'wagmi'
import { getParseUnits } from 'utils/yantraHelper'

const options = {}

const allocate = async (xYantraContract, usageAddress, amountToAllocate, data) => {
  return xYantraContract.write.allocate([usageAddress, amountToAllocate, data], { ...options })
}

const deallocate = async (xYantraContract, usageAddress, amountToDeAllocate, data) => {
  return xYantraContract.write.deallocate([usageAddress, amountToDeAllocate, data], { ...options })
}

const useAllocate = () => {
  const { address } = useAccount()
  const xYantraContract = useXYantraContract()

  const handleAllocate = useCallback(
    async (usageAddress, amountToAllocate, data = '') => {
      return allocate(xYantraContract, usageAddress, getParseUnits(amountToAllocate), data)
    },
    [xYantraContract],
  )

  const handleDeAllocate = useCallback(
    async (usageAddress, amountToDeAllocate, data = '') => {
      return deallocate(xYantraContract, usageAddress, getParseUnits(amountToDeAllocate), data)
    },
    [xYantraContract],
  )

  return { onAllocate: handleAllocate, onDeallocate: handleDeAllocate }
}

export default useAllocate
