"use client"
import { MessageCircle, X } from "lucide-react"

type Props = {
  onClick: () => void
  isOpen: boolean
}

export default function SmartAIButton({ onClick, isOpen }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-50 hover:bg-blue-700 transition-all duration-200 hover:scale-105"
      aria-label="Toggle SmartAI"
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  )
}
