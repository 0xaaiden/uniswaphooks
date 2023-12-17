import { getURL } from '@lib/utils'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@component/reusable/Tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@component/reusable/Card'

import { DataTable } from '@component/dashboard/components/DataTable'
import { columnsHook } from '@component/dashboard/components/Columns'
import { columnsResource } from '@component/dashboard/components/Columns'

async function getData(baseUrl = getURL()) {
  const [categoriesResponse, hooksResponse, resourcesResponse] =
    await Promise.all([
      fetch(`${baseUrl}/api/category?timestamp=${Date.now()}`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }),
      fetch(`${baseUrl}/api/hook?timestamp=${Date.now()}`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }),
      fetch(`${baseUrl}/api/resource?timestamp=${Date.now()}`, {
        method: 'GET',
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }),
    ])

  const categoriesData = categoriesResponse.data
  const hooksData = hooksResponse.data
  const resourcesData = resourcesResponse.data

  const hooksWithCategories = hooksData.map((hook) => ({
    ...hook,
    categories: categoriesData,
  }))

  return {
    hooks: hooksWithCategories,
    resources: resourcesData,
  }
}

export default async function Page() {
  const data = await getData()

  return (
    <>
      <Tabs defaultValue="hooks" className="px-8 py-4">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="hooks">
            Hooks{' '}
            <span className="pl-2 text-gray-400">({data.hooks?.length})</span>
          </TabsTrigger>
          <TabsTrigger value="resources">
            Resources
            <span className="pl-2 text-gray-400">
              ({data.resources?.length || 0})
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hooks">
          <Card>
            <CardHeader>
              <CardTitle>
                Hooks{' '}
                <span className="text-gray-400">({data.hooks?.length})</span>
              </CardTitle>
              <CardDescription>
                Manage your hooks here. You can publish, unpublish, edit and
                delete them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <DataTable data={data.hooks} columns={columnsHook} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>
                Resources{' '}
                <span className="text-gray-400">
                  ({data.resources?.length || 0})
                </span>
              </CardTitle>
              <CardDescription>
                Manage your resources here. You can publish, unpublish, edit and
                delete them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <DataTable data={data.resources} columns={columnsResource} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
