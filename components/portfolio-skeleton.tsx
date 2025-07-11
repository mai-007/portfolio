import { Skeleton } from "@/components/ui/skeleton"

export function PortfolioWorkSkeleton() {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function CategoryTabsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-16" />
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="space-y-3 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-4 w-20 mb-2" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-4 w-24 mb-2" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-24 mb-4" />
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  )
}

export function PdfSectionSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-6 w-20 mb-3" />
          <Skeleton className="w-full aspect-[5/2] rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export function PortfolioPageSkeleton() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Portfolio Works Skeleton */}
          <div className="lg:col-span-2">
            <Skeleton className="h-9 w-32 mb-8" />

            {/* Category Tabs Skeleton */}
            <CategoryTabsSkeleton />

            {/* Works Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <PortfolioWorkSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Right Column - Profile & Skills Skeleton */}
          <div className="space-y-8">
            {/* Profile Section Skeleton */}
            <ProfileSkeleton />

            {/* Skills Section Skeleton */}
            <SkillsSkeleton />

            {/* PDF Sections Skeleton */}
            <PdfSectionSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
