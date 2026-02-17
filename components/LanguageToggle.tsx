
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onSelect: (lang: Language) => void;
}

export const LanguageToggle: React.FC<Props> = ({ current, onSelect }) => {
  const langs: { id: Language; label: string; flag: string }[] = [
    { id: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { id: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
  ];

  return (
    <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b sticky top-0 z-50 shadow-sm">
      {langs.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onSelect(lang.id)}
          className={`flex-none px-4 py-2 rounded-full text-sm font-medium transition-all ${
            current === lang.id
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
};
