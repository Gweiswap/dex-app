import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { atom, useAtom } from 'jotai'
import { useContext } from 'react'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import { SwapFeaturesContext } from 'views/Swap/SwapFeaturesContext'

const isSwapHotTokenDisplay = atomWithStorageWithErrorCatch<boolean>('yantra:isHotTokensDisplay', false)
const isSwapHotTokenDisplayETH = atomWithStorageWithErrorCatch<boolean>('yantra:isHotTokensDisplayETH', true)
const isHotTokensDisplayMobile = atom(false)

export const useSwapHotTokenDisplay = () => {
  const { isMobile } = useMatchBreakpoints()
  const { isChartSupported } = useContext(SwapFeaturesContext)
  return useAtom(
    isMobile ? isHotTokensDisplayMobile : isChartSupported ? isSwapHotTokenDisplay : isSwapHotTokenDisplayETH,
  )
}
