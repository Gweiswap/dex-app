import { useToast } from '@pancakeswap/uikit'
import { Pool } from '@pancakeswap/widgets-internal'

import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useCallback, useState, useMemo } from 'react'
import { useAppDispatch } from 'state'
import { updateUserBalance, updateUserPendingReward, updateUserStakedBalance, updateUserAllowance } from 'state/pools'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { Token } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'
import { useERC20 } from 'hooks/useContract'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import { useApprovePool } from 'views/Pools/hooks/useApprove'
import { tokenImageChainNameMapping } from 'components/TokenImage'
import { usePool } from 'state/pools/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'
import ZkSyncWarning from './ZkSyncWarning'
import useStakePool from '../../hooks/useStakePool'
import useUnstakePool from '../../hooks/useUnstakePool'

const StakeModalContainer = ({
  isBnbPool,
  pool,
  isRemovingStake,
  onDismiss,
  stakingTokenBalance,
  stakingTokenPrice,
}: Pool.StakeModalPropsType<Token>) => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()

  const {
    sousId,
    earningToken,
    stakingToken,
    earningTokenPrice,
    apr,
    userData,
    stakingLimit,
    enableEmergencyWithdraw,
  } = pool
  const { address: account } = useAccount()
  const { toastSuccess } = useToast()
  const { pool: singlePool } = usePool(sousId)
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const [amount, setAmount] = useState('')

  const { onUnstake } = useUnstakePool(sousId, enableEmergencyWithdraw as boolean)
  const { onStake } = useStakePool(sousId, isBnbPool)
  const dispatch = useAppDispatch()

  const stakingTokenContract = useERC20(stakingToken.address)
  const { handleApprove, pendingTx: enablePendingTx } = useApprovePool(
    stakingTokenContract,
    sousId,
    earningToken.symbol,
  )

  const tokenImageUrl = useMemo(
    () => `https://tokens.yantra.exchange/images/${tokenImageChainNameMapping[chainId]}`,
    [chainId],
  )

  const onDone = useCallback(() => {
    dispatch(updateUserStakedBalance({ sousId, account, chainId }))
    dispatch(updateUserPendingReward({ sousId, account, chainId }))
    dispatch(updateUserBalance({ sousId, account, chainId }))
  }, [dispatch, sousId, account, chainId])

  const handleConfirmClick = useCallback(
    async (stakeAmount: string) => {
      const receipt = await fetchWithCatchTxError(() => {
        if (isRemovingStake) {
          return onUnstake(stakeAmount, stakingToken.decimals)
        }
        return onStake(stakeAmount, stakingToken.decimals)
      })
      if (receipt?.status) {
        if (isRemovingStake) {
          toastSuccess(
            `${t('Unstaked')}!`,
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Your %symbol% earnings have also been harvested to your wallet!', {
                symbol: earningToken.symbol,
              })}
            </ToastDescriptionWithTx>,
          )
        } else {
          toastSuccess(
            `${t('Staked')}!`,
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('Your %symbol% funds have been staked in the pool!', {
                symbol: stakingToken.symbol,
              })}
            </ToastDescriptionWithTx>,
          )
        }

        onDone?.()
        onDismiss?.()
      }
    },
    [
      fetchWithCatchTxError,
      isRemovingStake,
      onStake,
      stakingToken.decimals,
      stakingToken.symbol,
      onUnstake,
      onDone,
      onDismiss,
      toastSuccess,
      t,
      earningToken.symbol,
    ],
  )

  const needEnable = useMemo(() => {
    if (!isRemovingStake && !pendingTx) {
      const stakeAmount = getDecimalAmount(new BigNumber(amount), stakingToken.decimals)
      return stakeAmount.gt(singlePool.userData.allowance)
    }
    return false
  }, [singlePool, amount, pendingTx, isRemovingStake, stakingToken.decimals])

  const handleEnableApprove = async () => {
    await handleApprove()
    dispatch(updateUserAllowance({ sousId, account, chainId }))
  }

  return (
    <Pool.StakeModal
      enableEmergencyWithdraw={enableEmergencyWithdraw}
      stakingLimit={stakingLimit}
      stakingTokenPrice={stakingTokenPrice}
      earningTokenPrice={earningTokenPrice}
      stakingTokenDecimals={stakingToken.decimals}
      earningTokenSymbol={earningToken.symbol}
      stakingTokenSymbol={stakingToken.symbol}
      stakingTokenAddress={stakingToken.address}
      stakingTokenBalance={stakingTokenBalance}
      apr={apr}
      userDataStakedBalance={userData?.stakedBalance}
      userDataStakingTokenBalance={userData?.stakingTokenBalance}
      onDismiss={onDismiss}
      pendingTx={pendingTx}
      account={account}
      needEnable={needEnable}
      enablePendingTx={enablePendingTx}
      handleEnableApprove={handleEnableApprove}
      setAmount={setAmount}
      handleConfirmClick={handleConfirmClick}
      isRemovingStake={isRemovingStake}
      imageUrl={tokenImageUrl}
      warning={<ZkSyncWarning />}
    />
  )
}

export default StakeModalContainer
