import type { Client } from '@/types/typesApi'
// import type { User } from '@/types/userType'
import { create } from 'zustand'

type UserStore = {
  user: Client | null
  setUser: (user: Client) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => ({ user: null }),
}))
