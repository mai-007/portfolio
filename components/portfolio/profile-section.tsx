'use client'

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { type ProfileData } from "@/lib/api"

interface ProfileSectionProps {
  profileData: ProfileData | null
}

export const ProfileSection = ({ profileData }: ProfileSectionProps) => {
  if (!profileData) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
        <p className="text-gray-500 text-center">プロフィール情報がありません</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        {profileData.avatar ? (
          <Image
            src={profileData.avatar.url || "/placeholder.svg"}
            alt={profileData.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {profileData.name ? profileData.name.charAt(0) : "U"}
            </span>
          </div>
        )}
        <h2 className="text-xl font-bold text-gray-900">{profileData.name || "Unknown User"}</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
        {profileData.description}
      </p>

      {profileData.profileTags && profileData.profileTags.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">興味・関心</p>
          <div className="flex flex-wrap gap-2">
            {profileData.profileTags.map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {profileData.experienceTags && profileData.experienceTags.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">今までの経験等</p>
          <div className="flex flex-wrap gap-2">
            {profileData.experienceTags.map((tag, index) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
