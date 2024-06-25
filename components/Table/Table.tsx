'use client'
import React, {FC, useState, useEffect} from 'react'

const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=`

export const Table: FC = () => {
  const [data, setData] = useState(null)
  const [urlPage, setUrlPage] = useState(10)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url + urlPage)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [urlPage])

  const nextPage = () => {
    setUrlPage(urlPage + 10)
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div className="relative overflow-x-auto">
      <div className="flex mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={nextPage}>
          Загрузить еще
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            (data as any[]).map((val, index) => (
              <tr
                key={val.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  <img
                    src={val.image}
                    alt={val.name}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{val.name}</td>
                <td className="px-6 py-4">{val.current_price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
