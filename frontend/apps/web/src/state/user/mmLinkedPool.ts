import { useAtom } from 'jotai'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'

const userUseMMLinkedPoolAtom = atomWithStorageWithErrorCatch<boolean>('yantra:useMMlinkedPool', true)

export function useMMLinkedPoolByDefault() {
  return useAtom(userUseMMLinkedPoolAtom)
}
