'use server'

import { getWorkById } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getAllWorkIdsSortedByPublishDate } from "@/lib/api"
import { WorkContentRenderer } from "@/components/portfolio/work-content-renderer"

export async function generateStaticParams() {
  const allWorks = await getAllWorkIdsSortedByPublishDate();
  return allWorks.map((work) => ({ id: work.id }));
}

interface WorkDetailPageProps {
  params: { id: string }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const allWorks = await getAllWorkIdsSortedByPublishDate();
  const currentIndex = allWorks.findIndex(work => work.id === params.id);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  const work = await getWorkById(params.id)

  if (!work) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-full mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-lg font-medium text-gray-500 hover:text-gray-900">
              &larr; Back to Portfolio
            </Link>
            <div className="space-x-4">
              {prevWork && (
                <Link href={`/work/${prevWork.id}`} className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  &larr; 前へ
                </Link>
              )}
              {nextWork && (
                <Link href={`/work/${nextWork.id}`} className="text-lg font-medium text-gray-500 hover:text-gray-900">
                  次へ &rarr;
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {work.eyecatch && (
                <div className="w-full aspect-[16/9] relative">
                  <Image
                    src={work.eyecatch.url}
                    alt={work.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="p-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{work.title}</h1>

                {work.publishDate && (
                  <p className="text-gray-500 mb-6">
                    Published on: {new Date(work.publishDate).toLocaleDateString()}
                  </p>
                )}

v

                {work.content && (
                  <WorkContentRenderer htmlContent={work.content} spimageUrl={work.spimage?.url || null} />
                )}
              </div>
            </article>
          </div>

          <aside className="lg:col-span-1 top-8">
            <section className="sticky bg-white rounded-lg shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>

              {/* Date */}
              {work.date && (
                <div className="mb-4">
                  <p className="text-gray-600">
                  制作日:{new Date(work.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}

              {/* Roles */}
              {work.roles && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Roles</h3>
                  <p className="text-gray-600">{work.roles}</p>
                </div>
              )}

              {/* Categories */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {work.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-block bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    View on GitHub
                  </a>
                )}
                {work.githubUrl && (
                  <a
                    href={work.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    GitHub URL
                  </a>
                )}
                {work.figma && (
                  <a
                    href={work.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    View on Figma
                  </a>
                )}
                {work.figmaURL && (
                  <a
                    href={work.figmaURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    Figma URL
                  </a>
                )}
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline block"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
