
import React, { useState, useEffect } from 'react';
import { TranslationStrings } from '../types';

interface Props {
  onCommand: (command: string) => void;
  t: TranslationStrings;
}

export const VoiceAssistant: React.FC<Props> = ({ onCommand, t }) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSupported(true);
    }
  }, []);

  const toggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.lang = 'gu-IN' || 'en-US' || 'hi-IN'; // Should ideally switch based on lang
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice Transcript:", transcript);
      onCommand(transcript);
      setIsListening(false);
    };

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <button
        onClick={toggleListen}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isListening ? 'bg-red-500 scale-125 animate-pulse' : 'bg-green-600'
        } text-white`}
      >
        {isListening ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z" />
          </svg>
        )}
      </button>
      {isListening && (
        <div className="absolute bottom-full right-0 mb-4 w-48 bg-black/80 text-white text-xs p-3 rounded-2xl shadow-xl backdrop-blur-sm animate-bounce">
          {t.voicePrompt}
        </div>
      )}
    </div>
  );
};
