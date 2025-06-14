import { styled } from 'styled-components'
import { Flex, Grid } from '@pancakeswap/uikit'
import Page from 'views/Page'
import EBox from 'components/EBox'
import EPageHeader from 'components/EPageHeader'

import { displayNumber } from 'utils/yantraHelper'
import PositionList from './components/PositionList'
import { useDashboardData } from './hooks/useDashboardData'

const Instruction = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #477968;
  margin-top: 24px;
`
const RewardCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  text-align: center;
  gap: 2px;
`
const RewardLabel = styled.label`
  font-size: 16px;
  color: gray;
`
const RewardValue = styled.span`
  font-size: 24px;
`

const Booster = () => {
  const dashboardData = useDashboardData()

  return (
    <Page>
      <Flex
        flexDirection="column"
        maxWidth={1024}
        width="100%"
        height="100%"
        position="relative"
        alignItems="center"
        style={{ gap: 16 }}
      >
        <EPageHeader pageName="Yield Booster">
          <Instruction>Allocate xYANTRA here to increase the yield of your staking positions up to +100%.</Instruction>
        </EPageHeader>

        <Flex marginTop={36} flexWrap="wrap" style={{ gap: 12 }} justifyContent="center">
          <RewardCard>
            <RewardValue>{displayNumber(dashboardData.totalAllocation)} xYANTRA</RewardValue>
            <RewardLabel>Total allocations</RewardLabel>
          </RewardCard>

          <RewardCard>
            <RewardValue>{Math.floor(dashboardData.userAllocation)} xYANTRA</RewardValue>
            <RewardLabel>Your allocation</RewardLabel>
          </RewardCard>

          <RewardCard>
            <RewardValue>{dashboardData.deAllocationFee}%</RewardValue>
            <RewardLabel>Deallocation fee</RewardLabel>
          </RewardCard>
        </Flex>

        <PositionList onRefetchData={dashboardData.refetchContracts} />
      </Flex>
    </Page>
  )
}

export default Booster
