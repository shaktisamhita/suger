
import { TranslationStrings, Language, DeliverySlot } from './types';

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    title: "Sugar-NXT",
    quality: "Quality Score",
    moisture: "Moisture",
    brix: "Sweetness (Brix)",
    price: "Predicted Price",
    slots: "Delivery Slots",
    biofuel: "Biofuel Potential",
    scanBtn: "Scan Cane Quality",
    bookBtn: "Book Slot",
    booked: "Slot Booked!",
    share: "Share on WhatsApp",
    voicePrompt: "Try saying 'Show me slots' or 'Start Scan'",
    analysisTitle: "Cane Analysis Result",
    wasteManagement: "Waste to Biofuel"
  },
  gu: {
    title: "શુગર-NXT",
    quality: "ગુણવત્તા સ્કોર",
    moisture: "ભેજનું પ્રમાણ",
    brix: "ગળપણ (Brix)",
    price: "અંદાજિત કિંમત",
    slots: "ડિલિવરી સ્લોટ્સ",
    biofuel: "બાયોફ્યુઅલ ક્ષમતા",
    scanBtn: "કાઠી ક્વોલિટી ચેક",
    bookBtn: "સ્લોટ બુક કરો",
    booked: "સ્લોટ બુક થઈ ગયો!",
    share: "WhatsApp પર શેર કરો",
    voicePrompt: "'સ્લોટ્સ બતાવો' અથવા 'સ્કેન શરૂ કરો' બોલો",
    analysisTitle: "શેરડી વિશ્લેષણ પરિણામ",
    wasteManagement: "કચરો માંથી બાયોફ્યુઅલ"
  },
  hi: {
    title: "शुगर-NXT",
    quality: "गुणवत्ता स्कोर",
    moisture: "नमी",
    brix: "मिठास (Brix)",
    price: "अनुमानित मूल्य",
    slots: "डिलीवरी स्लॉट",
    biofuel: "बायोफ्यूल क्षमता",
    scanBtn: "गन्ने की क्वालिटी",
    bookBtn: "स्लॉट बुक करें",
    booked: "स्लॉट बुक हो गया!",
    share: "WhatsApp पर शेयर करें",
    voicePrompt: "'स्लॉट दिखाएं' या 'स्कैन शुरू करें' बोलें",
    analysisTitle: "गन्ना विश्लेषण परिणाम",
    wasteManagement: "अपशिष्ट से जैव ईंधन"
  }
};

export const INITIAL_SLOTS: DeliverySlot[] = [
  { id: '1', time: '14-Feb 10:00 AM', capacity: 5, bookedCount: 2, status: 'available' },
  { id: '2', time: '14-Feb 02:00 PM', capacity: 5, bookedCount: 4, status: 'available' },
  { id: '3', time: '15-Feb 09:00 AM', capacity: 5, bookedCount: 0, status: 'available' },
  { id: '4', time: '15-Feb 11:30 AM', capacity: 5, bookedCount: 5, status: 'full' },
  { id: '5', time: '15-Feb 03:00 PM', capacity: 5, bookedCount: 1, status: 'available' },
];
