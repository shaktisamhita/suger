
import React from 'react';
import { DeliverySlot, TranslationStrings } from '../types';

interface Props {
  slots: DeliverySlot[];
  bookedSlotId: string | null;
  onBook: (id: string) => void;
  t: TranslationStrings;
}

export const SlotBooking: React.FC<Props> = ({ slots, bookedSlotId, onBook, t }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span>🚚</span> {t.slots}
      </h2>
      <div className="space-y-3">
        {slots.map((slot) => {
          const isFull = slot.bookedCount >= slot.capacity;
          const isBookedByMe = bookedSlotId === slot.id;
          
          return (
            <div
              key={slot.id}
              className={`p-4 rounded-2xl border transition-all ${
                isBookedByMe 
                  ? 'border-green-500 bg-green-50 ring-2 ring-green-200' 
                  : isFull 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-100 hover:border-green-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-800">{slot.time}</div>
                  <div className="text-sm text-gray-500">
                    {slot.capacity - slot.bookedCount} slots left
                  </div>
                </div>
                
                {isBookedByMe ? (
                  <span className="text-green-600 font-bold text-sm bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                    ✓ {t.booked}
                  </span>
                ) : (
                  <button
                    disabled={isFull || bookedSlotId !== null}
                    onClick={() => onBook(slot.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                      isFull
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                    }`}
                  >
                    {t.bookBtn}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
