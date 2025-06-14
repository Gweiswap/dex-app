import { useCallback } from 'react'
import { useXYantraContract } from 'hooks/useContract1'

const options = {}

const convertYantra = async (xYantraContract, amountToConvert) => {
  return xYantraContract.write.convert([amountToConvert], { ...options })
}

const useConvertYantra = () => {
  const xYantraContract = useXYantraContract()

  const handleConvert = useCallback(
    async (amountToConvert) => {
      return convertYantra(xYantraContract, amountToConvert)
    },
    [xYantraContract],
  )

  return { onConvert: handleConvert }
}

export default useConvertYantra
