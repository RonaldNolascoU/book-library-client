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
  {
    name: 'My Library',
    href: '/',
    icon: BookOpenIcon,
    current: true,
    i18n: 'library'
  },
  {
    name: 'Activity',
    href: '/feed',
    icon: SignalIcon,
    current: false,
    i18n: 'activity'
  },
  {
    name: 'New Book',
    href: '/create',
    icon: PlusIcon,
    current: false,
    i18n: 'newBook'
  }
]

export const bookshelves = [
  {
    id: 1,
    name: 'Want to Read',
    href: '#',
    initial: 'P',
    current: false,
    key: 'WANT_TO_READ',
    i18n: 'wantToRead'
  },
  {
    id: 2,
    name: 'Currently Reading',
    href: '#',
    initial: 'P',
    current: false,
    key: 'READING',
    i18n: 'reading'
  },
  {
    id: 3,
    name: 'Read',
    href: '#',
    initial: 'T',
    current: false,
    key: 'READ',
    i18n: 'read'
  }
]

export const secondaryNavigation = [
  { name: 'All', href: '#', current: true, key: 'ALL', i18n: 'all' },
  {
    name: 'Want to read',
    href: '#',
    current: false,
    key: 'WANT_TO_READ',
    i18n: 'wantToRead'
  },
  {
    name: 'Reading',
    href: '#',
    current: false,
    key: 'READING',
    i18n: 'reading'
  },
  { name: 'Read', href: '#', current: false, key: 'READ', i18n: 'read' }
]
