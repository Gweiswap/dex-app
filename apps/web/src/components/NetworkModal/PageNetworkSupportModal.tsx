import { Button, Modal, Text, Grid, Box, Message, MessageText, Flex } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/chains'
import Image from 'next/image'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { chains } from 'utils/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useMemo } from 'react'
import { useHistory } from 'contexts/HistoryContext'
import NextLink from 'next/link'
import { useMenuItems } from 'components/EMenu/hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from 'components/EMenu/utils'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'

export function PageNetworkSupportModal() {
  const { t } = useTranslation()
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const switchNetworkLocal = useSwitchNetworkLocal()
  const { chainId, isConnected, isWrongNetwork } = useActiveWeb3React()
  const { logout } = useAuth()

  const foundChain = useMemo(() => chains.find((c) => c.id === chainId), [chainId])
  const historyManager = useHistory()

  const lastValidPath = historyManager?.history?.find((h) =>
    [
      '/swap',
      'liquidity',
      '/',
      '/info',
      '/positions',
      '/xyantra',
      '/dividends',
      '/booster',
      '/launchpad',
      '/gauge',
      '/analytics',
    ].includes(h),
  )

  const menuItems = useMenuItems()
  const { pathname, push } = useRouter()

  const { title, image } = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

    return {
      title: activeSubMenuItem?.disabled ? activeSubMenuItem?.label : activeMenuItem?.label,
      image: activeSubMenuItem?.image || activeMenuItem?.image,
    }
  }, [menuItems, pathname])

  return (
    <Modal title={title || t('Check your network')} hideCloseButton headerBackground="gradientCardHeader">
      <Grid style={{ gap: '16px' }} maxWidth="360px">
        <Text bold>{t('It’s a Blast only feature')}</Text>

        {image && (
          <Box mx="auto" my="8px" position="relative" width="100%" minHeight="250px">
            <Image src={image} alt="feature" fill style={{ objectFit: 'contain' }} unoptimized />
          </Box>
        )}
        <Text small>
          {t(
            'Yantra features are currently available only on Blast Chain! Come over and join the community in the fun!',
          )}
        </Text>
        {canSwitch ? (
          <Button
            variant={foundChain && lastValidPath ? 'secondary' : 'primary'}
            isLoading={isLoading}
            onClick={() =>
              isWrongNetwork ? switchNetworkLocal(ChainId.BLAST_TESTNET) : switchNetworkAsync(ChainId.BLAST_TESTNET)
            }
          >
            {t('Switch to %chain%', { chain: 'Blast' })}
          </Button>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
        {isConnected && (
          <Button
            variant="secondary"
            onClick={() =>
              logout().then(() => {
                push('/')
              })
            }
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
        {foundChain && lastValidPath && (
          <NextLink href={lastValidPath ?? ''} passHref>
            <Button width="100%">{t('Stay on %chain%', { chain: foundChain.name })}</Button>
          </NextLink>
        )}
      </Grid>
    </Modal>
  )
}
