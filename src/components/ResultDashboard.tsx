import React from 'react';
import { CalculationResult } from '../types';
import { Award, AlertTriangle, Info, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ResultDashboardProps {
  result: CalculationResult;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result }) => {
  const {
    boardAverage,
    finalRequired,
    isExempt,
    isImpossible,
    isBarajApplied,
    isRisky,
    statusMessage,
    statusType,
  } = result;

  // Gauge calculations
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, boardAverage)) / 100) * circumference;

  // Required Score styling
  const getRequiredScoreStyle = () => {
    if (isExempt) return 'text-emerald-500 dark:text-emerald-400';
    if (isImpossible) return 'text-destructive font-black';
    if (isRisky) return 'text-amber-500 dark:text-amber-400';
    return 'text-primary';
  };

  // Status Banner styling
  const getBannerStyle = () => {
    switch (statusType) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'danger':
        return 'bg-destructive/10 text-destructive dark:text-red-400 border-destructive/30';
      case 'warning':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'info':
      default:
        return 'bg-primary/10 text-primary dark:text-blue-300 border-primary/30';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-card via-card/90 to-primary/5 border border-border/80 shadow-2xl shadow-primary/10 transition-all duration-300">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: SVG Circular Gauge */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              {/* Background Track */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-muted/40"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-primary transition-all duration-700 ease-out"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-extrabold text-foreground tracking-tight">
                {boardAverage.toFixed(1)}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Ortalama
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Kurul Ortalaması
            </h3>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              %{boardAverage.toFixed(1)} Başarı Puanı
            </p>
            {isExempt && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                <Sparkles className="w-3.5 h-3.5" /> Muafiyet Hak Kazandı
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-border/80" />

        {/* Right Side: Final Target Display */}
        <div className="flex flex-col items-center md:items-end w-full md:w-auto text-center md:text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Final Gereksinimi
            </span>
            {isBarajApplied && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-primary border border-primary/20">
                <ShieldCheck className="w-3 h-3" /> Baraj 50
              </span>
            )}
            {isImpossible && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> Zor!
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className={`text-4xl sm:text-5xl font-black tracking-tight ${getRequiredScoreStyle()}`}>
              {isExempt ? 'MUAF' : finalRequired.toFixed(1)}
            </span>
            {!isExempt && <span className="text-lg font-bold text-muted-foreground">/ 100</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isExempt
              ? 'Tüm kurullardan muafiyet hakkı kazanılmıştır.'
              : 'Barajı geçmek için final sınavından gereken not.'}
          </p>
        </div>
      </div>

      {/* Dynamic Alert Banner */}
      <div className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 transition-all duration-300 ${getBannerStyle()}`}>
        <div className="shrink-0 mt-0.5">
          {statusType === 'success' && <Award className="w-5 h-5" />}
          {statusType === 'danger' && <AlertTriangle className="w-5 h-5" />}
          {statusType === 'warning' && <AlertTriangle className="w-5 h-5" />}
          {statusType === 'info' && <Info className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
