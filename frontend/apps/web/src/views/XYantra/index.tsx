import { useState } from 'react'
import { styled } from 'styled-components'
import { Flex, Grid, useToast } from '@pancakeswap/uikit'
import Page from 'views/Page'
import EPageHeader from 'components/EPageHeader'
import { displayNumber } from 'utils/yantraHelper'
import XYantraCard from './components/XYantraCard'
import ProtocolCard from './components/ProtocolCard'
import GetXYantraCard from './components/GetXYantraCard'
import RedeemCard from './components/RedeemCard'
import { useDashboardData } from './hooks/useDashboardData'
import VestListCard from './components/VestListCard'

const Instruction = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #477968;
  margin-top: 24px;
`
const XYantraCardGrid = styled(Grid)`
  gap: 12px;
  flex-grow: 1;
  grid-template-columns: repeat(4, minmax(250px, 1fr));

  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(80vw, 1fr));
  }
`
const ProtocolCardGrid = styled(Grid)`
  flex-grow: 1;
  grid-template-columns: repeat(3, minmax(250px, 1fr));

  @media screen and (max-width: 1320px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`
const BottomCardGrid = styled(Grid)`
  flex-grow: 1;
  gap: 20px;
  margin-top: 24px;
  grid-template-columns: repeat(2, minmax(250px, 1fr));

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`
const LogoImg = styled(Flex)`
  padding: 16px;
  margin: 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 100%;
`

const XYantra = () => {
  const { toastError, toastSuccess } = useToast()
  const data = useDashboardData()

  const [refresh, setRefresh] = useState(false)

  return (
    <Page>
      <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        position="relative"
        alignItems="center"
        style={{ gap: 16 }}
      >
        <EPageHeader pageName="xYantra">
          <Instruction>
            Convert your YANTRA, redeem your xYANTRA and manage your xYANTRA plugins allocations.
          </Instruction>
        </EPageHeader>

        <Flex marginTop={36} flexWrap="wrap" justifyContent="center" alignItems="center">
          <LogoImg>
            <img src="/assets/xyantra-white.png" alt="xyantra" />
          </LogoImg>
          <XYantraCardGrid>
            <XYantraCard
              icon="/assets/icons/ph_wallet.png"
              title="Total xYANTRA"
              value={displayNumber(data.xYantraWalletBalance + data.allocation + data.redeemingBalance)}
            />
            <XYantraCard
              icon="/assets/icons/mdi_hand-coin-outline.png"
              title="Avaliable xYANTRA"
              value={displayNumber(data.xYantraWalletBalance)}
            />
            <XYantraCard
              icon="/assets/icons/grommet-icons_pie-chart.png"
              title="Allocated xYANTRA"
              value={displayNumber(data.allocation)}
            />
            <XYantraCard
              icon="/assets/icons/material-symbols_redeem.png"
              title="Redeeming xYANTRA"
              value={displayNumber(data.redeemingBalance)}
            />
          </XYantraCardGrid>
        </Flex>

        <ProtocolCardGrid>
          <ProtocolCard
            title="Dividends"
            content="Earn real yield from protocol earnings by staking your xYANTRA here."
            href="/xyantra/dividends"
            userAllocation={data.dividensAllocation}
            protocolAllocation={data.dividensProtocolAllocation}
            deAllocationFee={data.dividensDeAllocationFee}
          />
          <ProtocolCard
            title="Yield booster"
            content={<>Boost your staking yields by up to 100% by adding xYANTRA to any bligible position.</>}
            href="/xyantra/booster"
            userAllocation={data.boosterAllocation}
            protocolAllocation={data.boosterProtocolAllocation}
            deAllocationFee={data.boosterDeAllocationFee}
          />
          <ProtocolCard
            title="Launchpad"
            content="Get perks and benefits from every project on Yantra launchpad by staking your xYANTRA here."
            href="/xyantra/launchpad"
            userAllocation={data.launchpadAllocation}
            protocolAllocation={data.launchpadProtocolAllocation}
            deAllocationFee={data.launchpadDeAllocationFee}
          />
        </ProtocolCardGrid>

        <BottomCardGrid>
          <Flex flexDirection="column" style={{ gap: '8px' }}>
            <GetXYantraCard onRefetchData={data.refetchContracts} />
            <RedeemCard setRefresh={setRefresh} onRefetchData={data.refetchContracts} />
          </Flex>
          <VestListCard onRefetchData={data.refetchContracts} refresh={refresh} setRefresh={setRefresh} />
        </BottomCardGrid>
      </Flex>
    </Page>
  )
}

export default XYantra
