import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const userSingleHopAtom = atomWithStorage<boolean>('yantra:single-hop', false)

export function useUserSingleHopOnly() {
  return useAtom(userSingleHopAtom)
}
