'use client'

import { useEffect, useState } from "react"
import { getPostBySlug, type Work } from "@/lib/api"
import { WorkDetail } from "@/components/portfolio/work-detail"

export default function WorkPage({ params }: { params: { id: string } }) {
  const [work, setWork] = useState<Work | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true)
        const fetchedWork = await getPostBySlug(params.id)
        if (fetchedWork) {
          setWork(fetchedWork)
        } else {
          setError("Work not found.")
        }
      } catch (e) {
        setError("Failed to load work.")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchWork()
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>
  }

  if (!work) {
    return <div className="container mx-auto p-4">Work not found.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{work.title}</h1>
      <WorkDetail work={work} />
    </div>
  )
}
