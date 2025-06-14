import { useTranslation } from '@pancakeswap/localization'
import { ApprovalState } from 'hooks/useApproveCallback'
import { Field } from 'state/mint/actions'
import { styled } from 'styled-components'
import { ethereumTokens } from '@pancakeswap/tokens'
import { Link, RowBetween, Message, MessageText, Button, Dots } from '@pancakeswap/uikit'
import { Currency, CurrencyAmount } from '@pancakeswap/swap-sdk-core'
import { SendTransactionResult } from 'wagmi/actions'
import { useMemo } from 'react'

const InlineLink = styled(Link)`
  display: inline-flex;
  text-decoration: underline;
  color: #d67e0a;
`

interface ApproveLiquidityTokensProps {
  currencies: {
    [Field.CURRENCY_A]?: Currency
    [Field.CURRENCY_B]?: Currency
  }
  shouldShowApprovalGroup: boolean
  showFieldAApproval: boolean
  approveACallback: () => Promise<SendTransactionResult>
  revokeACallback: () => Promise<SendTransactionResult>
  currentAllowanceA: CurrencyAmount<Currency> | undefined
  approvalA: ApprovalState
  showFieldBApproval: boolean
  approveBCallback: () => Promise<SendTransactionResult>
  revokeBCallback: () => Promise<SendTransactionResult>
  currentAllowanceB: CurrencyAmount<Currency> | undefined
  approvalB: ApprovalState
}

export default function ApproveLiquidityTokens({
  shouldShowApprovalGroup,
  showFieldAApproval,
  approvalA,
  approveACallback,
  revokeACallback,
  currentAllowanceA,
  currencies,
  showFieldBApproval,
  approvalB,
  approveBCallback,
  revokeBCallback,
  currentAllowanceB,
}: ApproveLiquidityTokensProps) {
  const { t } = useTranslation()

  const revokeANeeded = useMemo(() => {
    return (
      showFieldAApproval &&
      currentAllowanceA?.greaterThan(0) &&
      currencies[Field.CURRENCY_A]?.chainId === ethereumTokens.usdt.chainId &&
      currencies[Field.CURRENCY_A]?.wrapped.address.toLowerCase() === ethereumTokens.usdt.address.toLowerCase()
    )
  }, [showFieldAApproval, currentAllowanceA, currencies])
  const revokeBNeeded = useMemo(() => {
    return (
      showFieldBApproval &&
      currentAllowanceB?.greaterThan(0) &&
      currencies[Field.CURRENCY_B]?.chainId === ethereumTokens.usdt.chainId &&
      currencies[Field.CURRENCY_B]?.wrapped.address.toLowerCase() === ethereumTokens.usdt.address.toLowerCase()
    )
  }, [showFieldBApproval, currentAllowanceB, currencies])
  const anyRevokeNeeded = revokeANeeded || revokeBNeeded

  return shouldShowApprovalGroup ? (
    <RowBetween style={{ gap: '8px' }}>
      {anyRevokeNeeded && (
        <Message variant="warning">
          <MessageText>
            <span>
              {t('USDT on Ethereum requires resetting approval when spending allowances are too low.')}
              <InlineLink
                external
                fontSize={14}
                href="https://docs.yantra.exchange/products/pancakeswap-exchange/faq#why-do-i-need-to-reset-approval-on-usdt-before-enabling-approving"
              >
                {' '}
                {t('Learn More')}
                {' >>'}
              </InlineLink>
            </span>
          </MessageText>
        </Message>
      )}
      {showFieldAApproval &&
        (revokeANeeded ? (
          <Button onClick={revokeACallback} disabled={approvalA === ApprovalState.PENDING} width="100%">
            {approvalA === ApprovalState.PENDING ? (
              <Dots>{t('Reset Approval on USDT', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
            ) : (
              t('Reset Approval on USDT', { asset: currencies[Field.CURRENCY_A]?.symbol })
            )}
          </Button>
        ) : (
          <Button onClick={approveACallback} disabled={approvalA === ApprovalState.PENDING} width="100%">
            {approvalA === ApprovalState.PENDING ? (
              <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Dots>
            ) : (
              t('Enable %asset%', { asset: currencies[Field.CURRENCY_A]?.symbol })
            )}
          </Button>
        ))}
      {showFieldBApproval &&
        (revokeBNeeded ? (
          <Button onClick={revokeBCallback} disabled={approvalB === ApprovalState.PENDING} width="100%">
            {approvalB === ApprovalState.PENDING ? (
              <Dots>{t('Reset Approval on USDT', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
            ) : (
              t('Reset Approval on USDT', { asset: currencies[Field.CURRENCY_B]?.symbol })
            )}
          </Button>
        ) : (
          <Button onClick={approveBCallback} disabled={approvalB === ApprovalState.PENDING} width="100%">
            {approvalB === ApprovalState.PENDING ? (
              <Dots>{t('Enabling %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Dots>
            ) : (
              t('Enable %asset%', { asset: currencies[Field.CURRENCY_B]?.symbol })
            )}
          </Button>
        ))}
    </RowBetween>
  ) : null
}
