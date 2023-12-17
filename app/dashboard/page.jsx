'use client'

import React, { useState, useEffect } from 'react'
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

export default function Dashboard() {
  const [data, setData] = useState({ hooks: [], resources: [] })

  useEffect(() => {
    async function getData() {
      try {
        const baseUrl = getURL()
        const responseHooks = await fetch(`${baseUrl}/api/hook`, {
          method: 'GET',
        }).then((res) => res.json())
        const responseCategories = await fetch(`${baseUrl}/api/category`, {
          method: 'GET',
        }).then((res) => res.json())
        const responseResources = await fetch(`${baseUrl}/api/resource`, {
          method: 'GET',
        }).then((res) => res.json())

        const categoriesData = responseCategories.data
        const hooksData = responseHooks.data
        const resourcesData = responseResources.data

        const hooksWithCategories = hooksData.map((hook) => ({
          ...hook,
          categories: categoriesData,
        }))

        setData({
          hooks: hooksWithCategories,
          resources: resourcesData,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getData()
  }, [])

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
