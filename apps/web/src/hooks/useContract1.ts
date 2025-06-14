import { useWalletClient } from 'wagmi'
import { useMemo } from 'react'
import {
  getDividendsContract,
  getYantraContract,
  getFsNFTPoolContract,
  getFsNFTPoolFactoryContract,
  getLaunchpadContract,
  getHyperPoolContract,
  getHyperPoolFactoryContract,
  getXYantraContract,
  getYieldBoosterContract,
} from 'utils/contractHelpers1'
import { useActiveChainId } from './useActiveChainId'

export const useYantraContract = () => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getYantraContract(signer ?? undefined, chainId), [signer, chainId])
}

export const useXYantraContract = () => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getXYantraContract(signer ?? undefined, chainId), [signer, chainId])
}

export const useDividendsContract = () => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getDividendsContract(signer ?? undefined, chainId), [signer, chainId])
}

export const useYieldBoosterContract = () => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getYieldBoosterContract(signer ?? undefined, chainId), [signer, chainId])
}

export const useHyperPoolFactoryContract = () => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getHyperPoolFactoryContract(signer ?? undefined, chainId), [signer, chainId])
}

export const useLaunchpadContract = (auctionAddress: string) => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(
    () => getLaunchpadContract(auctionAddress, signer ?? undefined, chainId),
    [signer, chainId, auctionAddress],
  )
}

export const useFsNftPoolFactoryContract = (poolFactoryAddress: string) => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(
    () => getFsNFTPoolFactoryContract(poolFactoryAddress, signer ?? undefined, chainId),
    [signer, chainId, poolFactoryAddress],
  )
}

export const useFsNFTPoolContract = (poolAddress: string) => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getFsNFTPoolContract(poolAddress, signer ?? undefined, chainId), [signer, chainId, poolAddress])
}

export const useHyperPoolContract = (poolAddress: string) => {
  const { chainId } = useActiveChainId()
  const { data: signer } = useWalletClient()
  return useMemo(() => getHyperPoolContract(poolAddress, signer ?? undefined, chainId), [signer, chainId, poolAddress])
}
