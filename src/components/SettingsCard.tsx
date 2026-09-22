import React from 'react';
import { Settings } from '../types';
import { List, CheckCircle2, Award, SlidersHorizontal, Percent } from 'lucide-react';

interface SettingsCardProps {
  settings: Settings;
  onUpdateSetting: (key: keyof Settings, value: number) => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ settings, onUpdateSetting }) => {
  const boardWeight = settings.boardWeight ?? 60;
  const finalWeight = settings.finalWeight ?? 40;

  const setPreset = (bw: number, fw: number) => {
    onUpdateSetting('boardWeight', bw);
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl shadow-black/5 dark:shadow-primary/5 transition-all duration-300 space-y-6">
      <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
        <h2 className="font-bold text-lg text-foreground tracking-tight">Sistem Ayarları</h2>
      </div>

      {/* Main 3 inputs: Kurul Sayısı, Geçme Notu, Finalsiz Sınırı */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Kurul Sayısı Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <List className="w-3.5 h-3.5 text-primary" />
            <span>Kurul Sayısı</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={10}
              placeholder="1"
              value={settings.boardCount === 0 ? '' : settings.boardCount}
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                onUpdateSetting('boardCount', isNaN(val) ? 0 : val);
              }}
              className="w-full bg-background/80 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">
              Adet
            </span>
          </div>
        </div>

        {/* Geçme Notu Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Geçme Notu</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              placeholder="0"
              value={settings.passingGrade === 0 ? '' : settings.passingGrade}
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                onUpdateSetting('passingGrade', isNaN(val) ? 0 : val);
              }}
              className="w-full bg-background/80 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">
              Puan
            </span>
          </div>
        </div>

        {/* Finalsiz Sınırı Input (Eski: Muafiyet Sınırı) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Finalsiz Sınırı</span>
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              placeholder="0"
              value={settings.exemptionLimit === 0 ? '' : settings.exemptionLimit}
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                onUpdateSetting('exemptionLimit', isNaN(val) ? 0 : val);
              }}
              className="w-full bg-background/80 border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">
              Puan
            </span>
          </div>
        </div>
      </div>

      {/* Oran Seçimi: Kurul & Final Ağırlıkları */}
      <div className="pt-3 border-t border-border/50 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-indigo-500" />
            <span>Kurul & Final Ağırlık Oranları</span>
          </label>
          <span className="text-xs font-bold text-foreground bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
            %{boardWeight} Kurul / %{finalWeight} Final
          </span>
        </div>

        {/* Preset Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPreset(60, 40)}
            className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
              boardWeight === 60 && finalWeight === 40
                ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25'
                : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60'
            }`}
          >
            %60 / %40
          </button>
          <button
            type="button"
            onClick={() => setPreset(50, 50)}
            className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
              boardWeight === 50 && finalWeight === 50
                ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25'
                : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60'
            }`}
          >
            %50 / %50
          </button>
          <button
            type="button"
            onClick={() => setPreset(40, 60)}
            className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
              boardWeight === 40 && finalWeight === 60
                ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25'
                : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/60'
            }`}
          >
            %40 / %60
          </button>
        </div>

        {/* Slider & Custom Input Row */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground w-12 text-left">
              Kurul
            </span>
            <input
              type="range"
              min={10}
              max={90}
              step={5}
              value={boardWeight}
              onChange={(e) => onUpdateSetting('boardWeight', parseInt(e.target.value))}
              className="flex-1 cursor-pointer"
              aria-label="Kurul ve Final Oranı Kaydırıcısı"
            />
            <span className="text-xs font-semibold text-muted-foreground w-12 text-right">
              Final
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground">Kurul Etkisi (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={boardWeight}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  onUpdateSetting('boardWeight', isNaN(val) ? 0 : val);
                }}
                className="w-full text-center bg-background/80 border border-input focus:border-primary rounded-xl px-3 py-1.5 text-xs font-bold text-foreground"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground">Final Etkisi (%)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={finalWeight}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  onUpdateSetting('finalWeight', isNaN(val) ? 0 : val);
                }}
                className="w-full text-center bg-background/80 border border-input focus:border-primary rounded-xl px-3 py-1.5 text-xs font-bold text-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
