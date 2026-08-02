import React from 'react';
import { Settings } from '../types';
import { List, CheckCircle2, Award, SlidersHorizontal } from 'lucide-react';

interface SettingsCardProps {
  settings: Settings;
  onUpdateSetting: (key: keyof Settings, value: number) => void;
}

export const SettingsCard: React.FC<SettingsCardProps> = ({ settings, onUpdateSetting }) => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl shadow-black/5 dark:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-border/60">
        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4" />
        </div>
        <h2 className="font-bold text-lg text-foreground tracking-tight">Sistem Ayarları</h2>
      </div>

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

        {/* Muafiyet Sınırı Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Muafiyet Sınırı</span>
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
    </div>
  );
};
