'use client'

interface ApiErrorProps {
  message: string
}

export const ApiError = ({ message }: ApiErrorProps) => (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-800 text-sm">
      <strong>API接続エラー:</strong> {message}
    </p>
  </div>
)
