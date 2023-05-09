import create from 'zustand'

type User = {
  id: string
  name: string
  email: string
  books?: any[]
}

type State = {
  user: User
  access_token: string
  isSidebarOpen: boolean
  feed?: any[]
}

type Actions = {
  setUser: (user: Object) => void
  setAccessToken: (access_token: string) => void
  setSidebarOpen: (isSidebarOpen: boolean) => void
  setFeed: (feed: any[]) => void
}

const useZustandStore = create<State & Actions>((set, get) => ({
  user: { id: '', name: '', email: '', books: [] },
  access_token: '',
  isSidebarOpen: false,
  feed: [],
  setUser: (user: any) => set({ user }),
  setAccessToken: (access_token: string) => set({ access_token }),
  setSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
  setFeed: (feed: any[]) => set({ feed })
}))

export default useZustandStore
