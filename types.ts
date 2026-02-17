
export type Language = 'en' | 'gu' | 'hi';

export interface CaneAnalysis {
  qualityScore: number;
  moisture: number;
  brix: number;
  pricePrediction: number;
  biofuelPotential: number;
  timestamp: string;
}

export interface DeliverySlot {
  id: string;
  time: string;
  capacity: number;
  bookedCount: number;
  status: 'available' | 'full';
}

export interface AppState {
  language: Language;
  history: CaneAnalysis[];
  slots: DeliverySlot[];
  bookedSlotId: string | null;
}

export interface TranslationStrings {
  title: string;
  quality: string;
  moisture: string;
  brix: string;
  price: string;
  slots: string;
  biofuel: string;
  scanBtn: string;
  bookBtn: string;
  booked: string;
  share: string;
  voicePrompt: string;
  analysisTitle: string;
  wasteManagement: string;
}
