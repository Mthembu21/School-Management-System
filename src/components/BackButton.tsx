import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="ml-1">Back</span>
    </button>
  );
}