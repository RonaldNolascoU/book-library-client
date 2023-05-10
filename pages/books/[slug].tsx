import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  LockOpenIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar'
import Navbar from '@/components/Navbar'
import useZustandStore from '@/hooks/useZustandStore'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { GET_BOOK, GET_USER } from '@/graphql/queries'
import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { BOOK_FINISHED_SUBSCRIPTION, FINISH_BOOK } from '@/graphql/mutations'
import { toast } from 'sonner'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export default function BookDetail() {
  const { setSidebarOpen } = useZustandStore()

  const router = useRouter()
  const { slug } = router.query

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { slug }
  })

  const getBook = useMemo(() => {
    if (!data) return {}

    const { getBook } = data
    return getBook
  }, [data])

  const [finishBookSub] = useMutation(FINISH_BOOK, {
    variables: { id: getBook.id, rating: 5 }
  })

  const finishBook = async () => {
    try {
      await finishBookSub()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const t = useTranslations('global')

  return (
    <>
      <Head>
        <title>{getBook.title}</title>
      </Head>
      <div>
        <Navbar />

        {/* Static sidebar for desktop */}
        <Sidebar />

        <div className="xl:pl-72">
          {/* Sticky search header */}
          <SearchBar setSidebarOpen={setSidebarOpen} hideSearchBar />

          <main>
            <div className="py-8 xl:py-4">
              <div className="max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
                <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
                  <div>
                    <div>
                      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-400">
                            {getBook.title}
                          </h1>
                          <p className="mt-2 text-sm text-gray-500">
                            {t('created-by')}{' '}
                            <a href="#" className="font-medium text-gray-400">
                              {getBook.author}
                            </a>{' '}
                          </p>
                        </div>
                        <div className="mt-4 flex space-x-3 md:mt-0">
                          <Link
                            href={`/books/edit/${getBook.slug}`}
                            type="button"
                            className="inline-flex justify-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  "
                          >
                            <PencilIcon
                              className="-ml-0.5 h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                            {t('edit')}
                          </Link>
                          <button
                            onClick={() => finishBook()}
                            type="button"
                            className="inline-flex justify-center gap-x-1.5 rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  "
                          >
                            <CheckIcon
                              className="-ml-0.5 h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                            {t('finish')}
                          </button>
                        </div>
                      </div>

                      <div className="py-3 xl:pb-0 xl:pt-6">
                        <img
                          className="rounded-lg"
                          src={getBook.coverImage}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <aside className="hidden xl:block xl:pl-8">
                  <h2 className="sr-only">{t('details')}</h2>
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-gray-400">
                        {t('created-on')}{' '}
                        <time dateTime="2020-12-02">{getBook.date}</time>
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-8 border-t border-gray-200 py-6">
                    <div>
                      <div className="inline">
                        <div className="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300">
                          <div className="absolute flex flex-shrink-0 items-center justify-center">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-rose-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3 text-xs font-semibold text-gray-400">
                            {getBook.collectionSection}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  }
}

export const getStaticPaths = ({ locales }: any) => {
  return {
    paths: [
      // if no `locale` is provided only the defaultLocale will be generated
      { params: { slug: 'post-1' }, locale: 'en' },
      { params: { slug: 'post-1' }, locale: 'es' }
    ],
    fallback: true
  }
}
