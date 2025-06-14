import { useEffect, useState } from 'react'
import { useAccount, useChainId, useContractReads } from 'wagmi'
import { getContractResult, getFormattedUnits } from 'utils/yantraHelper'
import {
  DIVIDENDS_ADDRESS,
  YANTRA_ADDRESS,
  LAUNCHPAD_ADDRESS,
  XYANTRA_ADDRESS,
  YIELD_BOOSTER_ADDRESS,
} from 'config/constants/yantra'
import { yantraTokenABI } from 'config/abi/IYantraToken'
import { xYantraTokenABI } from 'config/abi/IXYantraToken'
import { yantraDividendsABI } from 'config/abi/IYantraDividends'
import { yantraYieldBoosterABI } from 'config/abi/IYantraYieldBooster'
import { yantraLaunchpadABI } from 'config/abi/IYantraLaunchpad'

export const useDashboardData = () => {
  const { address } = useAccount()
  const chainId = useChainId()

  const [yantraWalletBalance, setYantraWalletBalance] = useState(0)
  const [xYantraWalletBalance, setXYantraWalletBalance] = useState(0)
  const [allocation, setAllocation] = useState(0)
  const [redeemingBalance, setRedeemingBalance] = useState(0)

  const [dividensAllocation, setDividensAllocation] = useState(0)
  const [boosterAllocation, setBoosterAllocation] = useState(0)
  const [launchpadAllocation, setLaunchpadAllocation] = useState(0)

  const [dividensProtocolAllocation, setDividensProtocolAllocation] = useState(0)
  const [boosterProtocolAllocation, setBoosterProtocolAllocation] = useState(0)
  const [launchpadProtocolAllocation, setLaunchpadProtocolAllocation] = useState(0)

  const [dividensDeAllocationFee, setDividensDeAllocationFee] = useState(0)
  const [boosterDeAllocationFee, setBoosterDeAllocationFee] = useState(0)
  const [launchpadDeAllocationFee, setLaunchpadDeAllocationFee] = useState(0)

  const { data: contractResult, refetch: refetchContracts } = useContractReads({
    contracts: [
      {
        address: YANTRA_ADDRESS,
        abi: yantraTokenABI,
        chainId,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'getXYantraBalance',
        args: [address as `0x${string}`],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'getUsageAllocation',
        args: [address as `0x${string}`, DIVIDENDS_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'getUsageAllocation',
        args: [address as `0x${string}`, YIELD_BOOSTER_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'getUsageAllocation',
        args: [address as `0x${string}`, LAUNCHPAD_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'usagesDeallocationFee',
        args: [DIVIDENDS_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'usagesDeallocationFee',
        args: [YIELD_BOOSTER_ADDRESS],
      },
      {
        address: XYANTRA_ADDRESS,
        abi: xYantraTokenABI,
        chainId,
        functionName: 'usagesDeallocationFee',
        args: [LAUNCHPAD_ADDRESS],
      },
      {
        address: DIVIDENDS_ADDRESS,
        abi: yantraDividendsABI,
        chainId,
        functionName: 'totalAllocation',
      },
      {
        address: YIELD_BOOSTER_ADDRESS,
        abi: yantraYieldBoosterABI,
        chainId,
        functionName: 'totalAllocation',
      },
      {
        address: LAUNCHPAD_ADDRESS,
        abi: yantraLaunchpadABI,
        chainId,
        functionName: 'totalAllocation',
      },
    ],
  })

  useEffect(() => {
    if (!contractResult) return
    setYantraWalletBalance(getContractResult(contractResult[0]))
    setXYantraWalletBalance(getContractResult(contractResult[1]))
    if (contractResult[2].status === 'success') {
      setAllocation(getFormattedUnits(contractResult[2].result[0]))
      setRedeemingBalance(getFormattedUnits(contractResult[2].result[1]))
    }
    setDividensAllocation(getContractResult(contractResult[3]))
    setBoosterAllocation(getContractResult(contractResult[4]))
    setLaunchpadAllocation(getContractResult(contractResult[5]))
    setDividensDeAllocationFee(getContractResult(contractResult[6], 2))
    setBoosterDeAllocationFee(getContractResult(contractResult[7], 2))
    setLaunchpadDeAllocationFee(getContractResult(contractResult[8], 2))
    setDividensProtocolAllocation(getContractResult(contractResult[9]))
    setBoosterProtocolAllocation(getContractResult(contractResult[10]))
    setLaunchpadProtocolAllocation(getContractResult(contractResult[11]))
  }, [contractResult])

  return {
    yantraWalletBalance,
    xYantraWalletBalance,
    allocation,
    redeemingBalance,
    dividensAllocation,
    boosterAllocation,
    launchpadAllocation,
    dividensProtocolAllocation,
    boosterProtocolAllocation,
    launchpadProtocolAllocation,
    dividensDeAllocationFee,
    boosterDeAllocationFee,
    launchpadDeAllocationFee,
    refetchContracts,
  }
}
