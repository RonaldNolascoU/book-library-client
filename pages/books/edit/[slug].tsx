import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import SearchBar from '@/components/SearchBar'
import useZustandStore from '@/hooks/useZustandStore'
import { ADD_BOOK, UPDATE_BOOK } from '@/graphql/mutations'
import { GET_BOOK } from '@/graphql/queries'
import { GetStaticPropsContext } from 'next'

const BookEdit: React.FC = () => {
  const router = useRouter()
  const [updateBook] = useMutation(UPDATE_BOOK)
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [coverImage, setCoverImage] = useState<File>()
  const [collection, setCollection] = useState<string>('')

  const { setSidebarOpen } = useZustandStore()

  const { slug } = router.query

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { slug }
  })

  useEffect(() => {
    if (!data) return
    const { getBook } = data

    setTitle(getBook.title)
    setAuthor(getBook.author)
    setDate(getBook.date)
    setCollection(getBook.collectionSection)
  }, [data])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const input: any = {
        title,
        author,
        date,
        coverImage,
        collectionSection: collection
      }

      await updateBook({ variables: { slug, input } })
      console.log('Book added successfully')
      router.push('/')
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverImage(event.target.files[0])
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Navbar />
        {/* Static sidebar for desktop */}
        <Sidebar />

        <div className="xl:pl-72">
          <SearchBar setSidebarOpen={setSidebarOpen} hideSearchBar />
          <main className="lg:pr-96">
            <form className="px-8 pt-4 lg:pt-8 lg:pr-8" onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-white">
                    New Book
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Harry Potter"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="author"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Author
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="author"
                          id="author"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          placeholder="J.K. Rowling"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Date
                      </label>
                      <div className="mt-2">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          placeholder="Date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="collection"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Collection
                      </label>
                      <div className="mt-2">
                        <select
                          id="collection"
                          name="collection"
                          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                          value={collection}
                          onChange={(e) => setCollection(e.target.value)}
                        >
                          <option
                            value="WANT_TO_READ"
                            defaultValue={'WANT_TO_READ'}
                          >
                            Want to read
                          </option>
                          <option value="READING">Reading</option>
                          <option value="READ">Read</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Cover image
                      </label>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-500"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-400">
                            <label
                              htmlFor="coverImage"
                              className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="coverImage"
                                name="coverImage"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-400">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  )
}

export default BookEdit

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default
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
