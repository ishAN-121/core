"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const fetchSearchResults = async (query: string) => {
  const { data } = await axios.get(`/api/search?q=${encodeURIComponent(query)}`)
  return data
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey:['search', searchTerm],
    queryFn:() => fetchSearchResults(searchTerm),
    enabled: !!searchTerm,
})

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    refetch()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e:any) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>

      {isError && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <p className="text-red-500">Error fetching data. Please try again.</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {data.results && data.results.length > 0 ? (
              <ul className="list-disc pl-5">
                {data.results.map((item: { name: string }, index: number) => (
                  <li key={index} className="mb-2">{item.name}</li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}