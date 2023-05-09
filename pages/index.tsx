import { Fragment, useEffect, useMemo, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import {
  Bars3Icon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT } from '@/graphql/mutations'
import useZustandStore from '@/hooks/useZustandStore'
import { useRouter } from 'next/router'
import { classNames, secondaryNavigation } from '@/lib/utils'
import MobileSidebar from '@/components/MobileSidebar'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { GET_USER } from '@/graphql/queries'
import ActivityFeed from '@/components/ActivityFeed'

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00'
  }
]

export default function Homepage() {
  const {
    setSidebarOpen,
    setUser,
    user: { books = [] }
  } = useZustandStore()

  const router = useRouter()

  const { data, error } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network'
  })

  if (error) router.push('/login')

  const [tab, setTab] = useState<string>('ALL')
  const [sort, setSort] = useState<string>('title')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (!data) return
    const {
      getMe: { user: { id = '', email = '', name = '', books = [] } = {} }
    } = data || {}

    setUser({ id, email, name, books })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const sortBooks = (sort: string, array: any[]) => {
    if (sort === 'title') {
      array.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'date') {
      array.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    }
    return array
  }

  const searchBooks = (search: string, array: any[]) => {
    if (!search) return array
    return array.filter((book) => {
      return (
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.date.toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  const getFilteredBooks = useMemo(() => {
    const shallowBooks = [...books]
    let filteredBooks = sortBooks(sort, shallowBooks)
    filteredBooks = searchBooks(search, filteredBooks)

    if (tab === 'ALL') return filteredBooks

    return filteredBooks.filter((book) => book.collectionSection === tab)
  }, [books, tab, sort, search])

  const handleSearch = (search: string) => {
    setSearch(search)
  }

  return (
    <>
      <Head>
        <title>Library</title>
      </Head>
      <div>
        <Navbar />
        {/* Static sidebar for desktop */}
        <Sidebar />

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <SearchBar setSidebarOpen={setSidebarOpen} onSearch={handleSearch} />

          <main className="lg:pr-96">
            <header className="flex items-center justify-between border-b border-white/5 px-4 sm:px-6 lg:px-8">
              <nav className="flex overflow-x-auto py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name} onClick={() => setTab(item.key)}>
                      <a
                        href={item.href}
                        className={item.key === tab ? 'text-indigo-400' : ''}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sort dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                  Sort by
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => setSort('title')}
                          className={classNames(
                            active ? 'bg-gray-50 ' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                          )}
                        >
                          Title
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => setSort('date')}
                          className={classNames(
                            active ? 'bg-gray-50 ' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'
                          )}
                        >
                          Date
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </header>

            {/* Book list */}

            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 px-8 pt-4"
            >
              {(getFilteredBooks || []).map((file) => (
                <Link key={file.id} href={`books/${file?.slug}`}>
                  <li className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                      <img
                        src={file.coverImage}
                        alt=""
                        className="pointer-events-none object-cover group-hover:opacity-75"
                      />
                      <button
                        type="button"
                        className="absolute inset-0 focus:outline-none"
                      >
                        <span className="sr-only">
                          View details for {file.title}
                        </span>
                      </button>
                    </div>
                    <p className="truncate text-lg leading-5 text-gray-400 mt-2">
                      {file.title}
                    </p>
                    <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                      <p className="whitespace-nowrap">{file.author}</p>
                      <svg
                        viewBox="0 0 2 2"
                        className="h-0.5 w-0.5 flex-none fill-gray-300"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="whitespace-nowrap">{file.date}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </main>

          {/* Activity feed */}
          <ActivityFeed />
        </div>
      </div>
    </>
  )
}
