import { useCallback } from 'react'
import { useDividendsContract, useXYantraContract } from 'hooks/useContract1'
import { useAccount } from 'wagmi'
import { DIVIDENDS_ADDRESS } from 'config/constants/yantra'

const options = {}

const harvestAll = async (xYantraContract) => {
  return xYantraContract.write.harvestAllDividends([], { ...options })
}

const useHarvestAll = () => {
  const xYantraContract = useDividendsContract()

  const handleHarvestAll = useCallback(async () => {
    return harvestAll(xYantraContract)
  }, [xYantraContract])

  return { onHarvestAll: handleHarvestAll }
}

export default useHarvestAll
