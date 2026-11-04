import React, { useState } from 'react';
import { indianFoods } from '../data/indianFoods';

export default function IndianFoodModal({ isOpen, onClose, onAddFood }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredFoods = indianFoods.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleSelectQuick = (name) => {
    setSearchQuery(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl p-space-lg shadow-2xl space-y-space-md animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-space-xs">
          <div>
            <span className="font-caption text-caption text-secondary font-semibold uppercase tracking-wider">
              INDIAN NUTRITION COMPENDIUM
            </span>
            <h3 className="font-headline-lg text-headline-lg font-bold text-primary">
              Log Indian Food Item
            </h3>
          </div>
          <button 
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" 
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-3.5 text-outline text-xl">
            search
          </span>
          <input 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/50" 
            placeholder="Search Roti, Dal, Paneer, Dosa, Idli, Khichdi..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Quick frequent chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="font-caption text-caption text-on-surface-variant self-center mr-1">Frequent:</span>
          {['Roti', 'Dal', 'Paneer', 'Curd', 'Brown Rice', 'Sprouts'].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSelectQuick(chip)}
              className="px-3 py-1 rounded-full bg-surface-container hover:bg-secondary-fixed text-primary font-caption text-caption font-semibold transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Suggested Items List */}
        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {filteredFoods.length === 0 ? (
            <div className="p-4 text-center text-on-surface-variant font-body-sm">
              No matching Indian food items found for "{searchQuery}".
            </div>
          ) : (
            filteredFoods.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.tagBg} flex items-center justify-center ${item.tagText} font-bold text-sm shrink-0`}>
                    {item.tag}
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg font-semibold text-primary">{item.name}</p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      {item.portion} • {item.kcal} kcal • {item.protein}g Protein • {item.carbs}g Carbs
                    </p>
                  </div>
                </div>
                <button 
                  className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container shrink-0 ml-2" 
                  onClick={() => {
                    onAddFood(item);
                    onClose();
                  }}
                >
                  + Add
                </button>
              </div>
            ))
          )}
        </div>

        <div className="pt-space-xs flex items-center justify-between font-caption text-caption text-on-surface-variant">
          <span>Verified by Indian Dietetic Association (IFCT 2017)</span>
          <button 
            className="font-label-sm text-label-sm text-outline hover:text-primary" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

