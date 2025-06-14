/* eslint-disable react-hooks/rules-of-hooks */
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const airdropModal = atomWithStorage('yantra:v3-airdrop-modal', false)

export function useShowOnceAirdropModal() {
  return useAtom(airdropModal)
}
