import { BOOK_FINISHED_SUBSCRIPTION } from '@/graphql/mutations'
import useZustandStore from '@/hooks/useZustandStore'
import { useSubscription } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo } from 'react'

export default function ActivityFeed({ styleClasses = {} }) {
  const { data, loading, error } = useSubscription(BOOK_FINISHED_SUBSCRIPTION)

  const { feed = [], setFeed } = useZustandStore()

  const t = useTranslations('global')

  useEffect(() => {
    if (!data) return
    const {
      bookFinished: {
        book: { id = '', title = '', coverImage = '' } = {},
        user: { name = '' } = {}
      }
    } = data || {}

    const newFeedItem = {
      id,
      image: coverImage,
      user: { name },
      title: `${name} ${t('finished')} ${title}`
    }

    if (feed.some((item) => item.id === id)) return

    setFeed([...feed, newFeedItem])
  }, [data])

  return (
    <aside
      className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5"
      style={styleClasses}
    >
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          {t('feed')}
        </h2>
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {(feed || []).map((item) => (
          <li key={item.id} className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-3">
              <img
                src={item.image}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-800"
              />
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                {item.title}
              </h3>
              {/* <time
                dateTime={item.dateTime}
                className="flex-none text-xs text-gray-600"
              >
                {item.date}
              </time> */}
            </div>
            {/* <p className="mt-3 truncate text-sm text-gray-500">
              Pushed to{' '}
              <span className="text-gray-400">{item.projectName}</span> (
              <span className="font-mono text-gray-400">{item.commit}</span> on{' '}
              <span className="text-gray-400">{item.branch}</span>)
            </p> */}
          </li>
        ))}
      </ul>
    </aside>
  )
}
