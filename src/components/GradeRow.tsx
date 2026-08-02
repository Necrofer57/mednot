import React from 'react';
import { BoardGrade } from '../types';

interface GradeRowProps {
  grade: BoardGrade;
  onUpdateScore: (id: number, score: number) => void;
}

export const GradeRow: React.FC<GradeRowProps> = ({ grade, onUpdateScore }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onUpdateScore(grade.id, isNaN(val) ? 0 : val);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onUpdateScore(grade.id, val);
  };

  // Determine score color badge accent for quick visual feedback
  const getScoreColorClass = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (score > 0) return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-muted-foreground bg-muted/40 border-border/50';
  };

  return (
    <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md group">
      {/* Index Badge */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary font-extrabold text-sm flex items-center justify-center border border-primary/20 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {grade.id}
        </div>
        <span className="font-bold text-sm text-foreground sm:hidden flex-1">
          {grade.name}
        </span>
      </div>

      {/* Title (Desktop) */}
      <div className="hidden sm:block w-24 shrink-0">
        <span className="font-semibold text-sm text-foreground">
          {grade.name}
        </span>
      </div>

      {/* Slider Area */}
      <div className="flex-1 w-full flex items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground w-4 text-right">0</span>
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={grade.score}
            onChange={handleSliderChange}
            className="w-full"
            aria-label={`${grade.name} Notu Kaydırıcı`}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground w-6 text-left">100</span>
      </div>

      {/* Input Box */}
      <div className="w-full sm:w-20 shrink-0 flex items-center justify-end">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          max={100}
          value={grade.score === 0 ? '' : grade.score}
          placeholder="0"
          onChange={handleInputChange}
          className={`w-full sm:w-20 text-center font-extrabold text-base rounded-xl px-2 py-2 border transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:outline-none ${getScoreColorClass(
            grade.score
          )}`}
          aria-label={`${grade.name} Notu Sayısal Girdisi`}
        />
      </div>
    </div>
  );
};
