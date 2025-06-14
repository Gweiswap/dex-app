import { useCallback } from 'react'
import { useXYantraContract } from 'hooks/useContract1'

const options = {}

const redeem = async (xYantraContract, amountToRedeem, duration) => {
  return xYantraContract.write.redeem([amountToRedeem, duration], { ...options })
}

const finalizeRedeem = async (xYantraContract, index) => {
  return xYantraContract.write.finalizeRedeem([index], { ...options })
}

const cancelRedeem = async (xYantraContract, index) => {
  return xYantraContract.write.cancelRedeem([index], { ...options })
}

export const useRedeem = () => {
  const xYantraContract = useXYantraContract()

  const handleRedeem = useCallback(
    async (amountToRedeem, duration) => {
      return redeem(xYantraContract, amountToRedeem, duration)
    },
    [xYantraContract],
  )

  return { onRedeem: handleRedeem }
}

export const useFinalizeRedeem = () => {
  const xYantraContract = useXYantraContract()

  const handleFinalizeRedeem = useCallback(
    async (index) => {
      return finalizeRedeem(xYantraContract, index)
    },
    [xYantraContract],
  )

  return { onFinalizeRedeem: handleFinalizeRedeem }
}

export const useCancelRedeem = () => {
  const xYantraContract = useXYantraContract()

  const handleCancelRedeem = useCallback(
    async (index) => {
      return cancelRedeem(xYantraContract, index)
    },
    [xYantraContract],
  )

  return { onCancelRedeem: handleCancelRedeem }
}
