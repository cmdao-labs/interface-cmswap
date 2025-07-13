// components/CustomPopup.tsx
'use client'
import React from 'react'
import { X } from 'lucide-react'

interface CustomPopupProps {
  isOpen: boolean
  onClose: () => void
  header: string
  description: React.ReactNode
  actionButton: React.ReactNode
  footer?: React.ReactNode
}

export default function CustomPopup({
  isOpen,
  onClose,
  header,
  description,
  actionButton,
  footer,
}: CustomPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">{header}</h2>

        {/* Description */}
        <div className="text-sm leading-relaxed mb-4">{description}</div>

        {/* Action Button */}
        <div className="mb-4">{actionButton}</div>

        {/* Optional Footer */}
        {footer && (
          <div className="border-t pt-4 text-xs text-gray-500 dark:text-gray-400 flex gap-4 justify-between">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
