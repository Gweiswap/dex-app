import { useCallback } from 'react'
import { useYantraContract } from 'hooks/useContract1'
import { useERC20 } from './useContract'

const options = {}

const approveToken = async (yantraContract, amountToApprove, spender) => {
  return yantraContract.write.approve([spender, amountToApprove], { ...options })
}

const useApproveToken = (tokenAddress) => {
  const yantraContract = useERC20(tokenAddress)

  const handleApprove = useCallback(
    async (amountToApprove, spender) => {
      return approveToken(yantraContract, amountToApprove, spender)
    },
    [yantraContract],
  )

  return { onApprove: handleApprove }
}

export default useApproveToken
