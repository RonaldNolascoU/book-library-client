import { LOGOUT } from '@/graphql/mutations'
import useZustandStore from '@/hooks/useZustandStore'
import { useMutation } from '@apollo/client'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

export default function LogoutButton() {
  const router = useRouter()

  const [logoutUser] = useMutation(LOGOUT)

  const { setAccessToken, setUser, user } = useZustandStore()

  const t = useTranslations('global')

  const logout = async () => {
    try {
      await logoutUser()

      // Clear state
      setAccessToken('')
      setUser({ name: '', email: '' })
      localStorage.removeItem('access_token')
    } catch (error: any) {
      console.error('Error logging out:', error)
      toast.error(error.message)
    } finally {
      // Redirect to login page
      router.push('/login')
    }
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
        {t('logout')} )
      </div>
    </a>
  )
}
