
import React, { useRef, useState, useCallback } from 'react';
import { analyzeCaneImage } from '../services/geminiService';
import { CaneAnalysis, TranslationStrings } from '../types';

interface Props {
  onAnalysisComplete: (data: CaneAnalysis) => void;
  t: TranslationStrings;
}

export const CameraScanner: React.FC<Props> = ({ onAnalysisComplete, t }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setIsCameraOpen(false);
    }
  };

  const capture = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        const base64Image = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
        
        setIsAnalyzing(true);
        const analysis = await analyzeCaneImage(base64Image);
        onAnalysisComplete(analysis);
        setIsAnalyzing(false);
        setIsCameraOpen(false);

        // Stop stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  }, [onAnalysisComplete]);

  return (
    <div className="p-4">
      {!isCameraOpen ? (
        <button
          onClick={startCamera}
          className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <span className="text-xl">📸</span>
          {t.scanBtn}
        </button>
      ) : (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl mb-8"
          />
          <canvas ref={canvasRef} width="640" height="480" className="hidden" />
          
          <div className="flex gap-4">
            <button
              disabled={isAnalyzing}
              onClick={() => setIsCameraOpen(false)}
              className="px-8 py-3 bg-white/20 text-white rounded-full font-medium"
            >
              Cancel
            </button>
            <button
              disabled={isAnalyzing}
              onClick={capture}
              className={`px-8 py-3 bg-green-500 text-white rounded-full font-bold shadow-xl ${isAnalyzing ? 'animate-pulse cursor-not-allowed' : 'active:scale-90'}`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Capture'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
