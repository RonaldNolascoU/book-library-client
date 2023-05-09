import {
  BookOpenIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  PlusIcon,
  ServerIcon,
  SignalIcon
} from '@heroicons/react/24/outline'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const navigation = [
  { name: 'My Library', href: '/', icon: BookOpenIcon, current: true },
  { name: 'Activity', href: '/feed', icon: SignalIcon, current: false },
  { name: 'New Book', href: '/create', icon: PlusIcon, current: false }
]

export const bookshelves = [
  {
    id: 1,
    name: 'Want to Read',
    href: '#',
    initial: 'P',
    current: false,
    key: 'WANT_TO_READ'
  },
  {
    id: 2,
    name: 'Currently Reading',
    href: '#',
    initial: 'P',
    current: false,
    key: 'READING'
  },
  { id: 3, name: 'Read', href: '#', initial: 'T', current: false, key: 'READ' }
]

export const secondaryNavigation = [
  { name: 'All', href: '#', current: true, key: 'ALL' },
  { name: 'Want to read', href: '#', current: false, key: 'WANT_TO_READ' },
  { name: 'Reading', href: '#', current: false, key: 'READING' },
  { name: 'Read', href: '#', current: false, key: 'READ' }
]
