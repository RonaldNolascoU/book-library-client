import { GET_USER } from '@/graphql/queries'
import useZustandStore from '@/hooks/useZustandStore'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    skip: router.pathname === '/login'
  })
  const { setUser } = useZustandStore()

  useEffect(() => {
    if (loading) return
    if (error) {
      console.log({ error })
      router.push('/login')
      toast.error('You are not logged in')
      return
    }

    if (router.pathname === '/login') return

    const {
      getMe: { user: { id = '', email = '', name = '', books = [] } = {} }
    } = data || {}

    setUser({ id, email, name, books })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error])

  return <main className="h-full">{children}</main>
}
