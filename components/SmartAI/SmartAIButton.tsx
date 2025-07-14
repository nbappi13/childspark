// components/SmartAI/SmartAIButton.tsx

'use client';

import React from 'react';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

export default function SmartAIButton({ onClick, isOpen }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-50 hover:bg-blue-700 transition"
      aria-label="Toggle SmartAI"
    >
      {isOpen ? '❌' : '💬'}
    </button>
  );
}
