import { getURL } from '@lib/utils'

import { DataTable } from '@component/dashboard/components/DataTable'
import { columns } from '@component/dashboard/components/Columns'

async function getData(baseUrl = getURL()) {
  const [categoriesResponse, hooksResponse] = await Promise.all([
    fetch(baseUrl + '/api/category', { method: 'GET' }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }),
    fetch(baseUrl + '/api/hook', { method: 'GET' }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    }),
  ])

  const categoriesData = categoriesResponse.data
  const hooksData = hooksResponse.data

  const hooksWithCategories = hooksData.map((hook) => ({
    ...hook,
    categories: categoriesData,
  }))

  return hooksWithCategories
}

export default async function Page() {
  const hooksData = await getData()

  return (
    <div className="px-20 py-20">
      <DataTable data={hooksData} columns={columns} />
    </div>
  )
}
