import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CalendlyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function CalendlyPopup({ isOpen, onClose, url }: CalendlyPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Schedule a Call</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Calendly iframe */}
        <iframe
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Schedule a call with Launch in 7"
          className="w-full h-full"
          style={{ height: 'calc(100% - 73px)' }}
        />
      </div>
    </div>
  );
}