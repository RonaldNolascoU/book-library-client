import { bookshelves, classNames, navigation } from '@/lib/utils'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import LogoutButton from './LogoutButton'
import useZustandStore from '@/hooks/useZustandStore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { COLLECTIONS } from '@/constants'

export default function Sidebar() {
  const router = useRouter()

  const { user: { books = [] } = {} } = useZustandStore()

  const { WANT_TO_READ, READING, READ } = COLLECTIONS

  const getNumberOfBooks: any = useMemo(() => {
    const toRead = books.filter(
      (book) => book.collectionSection === WANT_TO_READ
    )
    const reading = books.filter((book) => book.collectionSection === READING)
    const read = books.filter((book) => book.collectionSection === READ)

    return {
      WANT_TO_READ: toRead.length,
      READING: reading.length,
      READ: read.length
    }
  }, [books])
  return (
    <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        item.href === router.pathname
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Bookshelves
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {bookshelves.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                        {getNumberOfBooks[team.key] || 0}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="-mx-6 mt-auto">
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
