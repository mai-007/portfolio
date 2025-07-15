"use client"

import { useState, useEffect } from "react"
import {
  type Work,
  type Category,
  type Skill,
  type ProfileData,
} from "@/lib/api"

// API Routeから返されるデータの型を定義
interface ApiData {
  works: Work[]
  categories: Category[]
  skills: Skill[]
  apiStatus: { available: boolean; message: string }
}

export const usePortfolioData = () => {
  const [works, setWorks] = useState<Work[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  
  const [uniqueDates, setUniqueDates] = useState<string[]>([]) // ユニークな制作日
  const [loading, setLoading] = useState(true) // ローディング状態
  const [apiStatus, setApiStatus] = useState<{
    available: boolean
    message: string
  }>({ available: false, message: "" })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 800))

        const response = await fetch("/api/data")
        const data: ApiData | { error: string; detail?: string; isConfigured?: boolean } =
          await response.json()

        if (!response.ok || ("isConfigured" in data && !data.isConfigured)) {
          const errorMessage =
            "detail" in data && data.detail ? data.detail : "不明なAPIエラー"
          setApiStatus({ available: false, message: `APIエラー: ${errorMessage}` })
          console.error("API Routeからのデータ取得失敗:", data)
          await minLoadingTime
          setWorks([])
          setCategories([])
          setSkills([])
        } else {
          const fetchedData = data as ApiData
          setApiStatus(fetchedData.apiStatus)
          setWorks(fetchedData.works)
          setCategories(fetchedData.categories)
          setSkills(fetchedData.skills)

            // ユニークな制作年を抽出してソート
            const years = fetchedData.works
              .map((work) => (work.date ? new Date(work.date).getFullYear().toString() : null))
              .filter((year): year is string => !!year)
              .sort((a, b) => parseInt(b) - parseInt(a)) // 新しい年が上に来るようにソート
            const uniqueSortedYears = Array.from(new Set(years))
            setUniqueDates(uniqueSortedYears)
            console.log("Unique sorted years:", uniqueSortedYears);

            console.log("microCMS APIからデータを取得中...")
          console.log("取得したデータ:", {
            works: fetchedData.works.length,
            categories: fetchedData.categories.length,
            skills: fetchedData.skills.length,
            
          })
        }
        await minLoadingTime
      } catch (err) {
        console.error("データ取得エラー:", err)
        setApiStatus({
          available: false,
          message: `ネットワークエラー: ${
            err instanceof Error ? err.message : String(err)
          }`,
        })
        setWorks([])
        setCategories([])
        setSkills([])
        
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    works,
    categories,
    skills,
    
    loading,
    apiStatus,
    uniqueDates,
  }
}
