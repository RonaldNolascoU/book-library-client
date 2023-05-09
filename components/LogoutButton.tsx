import { LOGOUT } from '@/graphql/mutations'
import useZustandStore from '@/hooks/useZustandStore'
import { useMutation } from '@apollo/client'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export default function LogoutButton() {
  const router = useRouter()

  const [logoutUser, { data, loading, error }] = useMutation(LOGOUT)

  const { setAccessToken, setUser, user } = useZustandStore()

  const logout = async () => {
    await logoutUser()

    // Clear state
    setAccessToken('')
    setUser({ name: '', email: '' })

    // Redirect to login page
    router.push('/login')
  }

  return (
    <a
      onClick={() => logout()}
      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 cursor-pointer"
    >
      {user.name}{' '}
      <div aria-hidden="true" className="flex items-center">
        (
        <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
        Logout )
      </div>
    </a>
  )
}
