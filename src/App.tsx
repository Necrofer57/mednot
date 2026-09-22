import React, { useState, useEffect } from 'react';
import { useCalculator } from './useCalculator';
import { SettingsCard } from './components/SettingsCard';
import { GradeRow } from './components/GradeRow';
import { ResultDashboard } from './components/ResultDashboard';
import { InfoModal } from './components/InfoModal';
import { Sun, Moon, Info, RotateCcw, GraduationCap, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const {
    settings,
    grades,
    calculationResult,
    updateGrade,
    updateSetting,
    resetGrades,
  } = useCalculator();

  // Dark/Light Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mednot_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Info Modal open state
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Synchronize theme state with <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('mednot_theme', theme);
    } catch (e) {
      console.error('Failed to save theme:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-28 lg:pb-16">
      {/* Background Decorative Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-border/60 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img
              src="/icon.jpg"
              alt="MedNot Logo"
              className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-primary/30 border border-primary/20 hover:scale-105 transition-transform duration-200"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  MedNot
                </h1>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  PRO
                </span>
              </div>
              <span className="text-xs font-medium text-primary/80 -mt-0.5">
                Tıp Not Hesaplayıcı
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Info Modal Button */}
            <button
              onClick={() => setIsInfoOpen(true)}
              className="p-2.5 rounded-xl bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 shadow-sm"
              title="Bilgi & Kurallar"
              aria-label="Bilgi ve Kurallar Modalını Aç"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 shadow-sm"
              title={theme === 'dark' ? 'Aydınlık Mod' : 'Karanlık Mod'}
              aria-label="Tema Değiştir"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* Desktop 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left / Top Column: Results Dashboard & System Settings */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Hero Result Dashboard */}
            <ResultDashboard result={calculationResult} />

            {/* System Settings Card */}
            <SettingsCard settings={settings} onUpdateSetting={updateSetting} />
          </div>

          {/* Right Column: Interactive Grade Entries */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h2 className="font-extrabold text-lg text-foreground tracking-tight">
                  Kurul Not Girdileri
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                  {grades.length} Kurul
                </span>
              </div>

              {/* Reset All Grades */}
              <button
                onClick={resetGrades}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors px-2.5 py-1.5 rounded-lg hover:bg-destructive/10"
                title="Tüm notları sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            </div>

            {/* Scrollable Grade Items */}
            <div className="space-y-3">
              {grades.map((grade) => (
                <GradeRow
                  key={grade.id}
                  grade={grade}
                  onUpdateScore={updateGrade}
                />
              ))}
            </div>

            {/* Footer Hint */}
            <div className="p-4 rounded-2xl bg-card/40 border border-border/40 text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>
                  Değerleri doğrudan klavyeden yazabilir veya kaydırıcı ile anlık değiştirebilirsiniz.
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Sticky Result Bar (Ekranda sürekli kullanıcıyla birlikte gelen sonuç kartı) */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 z-40 max-w-lg mx-auto">
        <div className="glass-card backdrop-blur-xl bg-card/95 border border-primary/25 rounded-2xl p-3.5 shadow-2xl shadow-black/20 dark:shadow-primary/10 flex items-center justify-between gap-3 transition-all duration-300">
          {/* Left: Board Average */}
          <div className="flex flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Kurul Ortalaması
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black text-foreground tracking-tight">
                %{calculationResult.boardAverage.toFixed(1)}
              </span>
              {calculationResult.isBarajApplied && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-primary border border-primary/20">
                  Baraj 50
                </span>
              )}
            </div>
          </div>

          {/* Right: Target Final Score */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                Gereken Final
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black tracking-tight ${
                    calculationResult.isExempt
                      ? 'text-emerald-500 dark:text-emerald-400'
                      : calculationResult.isImpossible
                      ? 'text-destructive font-black'
                      : calculationResult.isRisky
                      ? 'text-amber-500'
                      : 'text-primary'
                  }`}
                >
                  {calculationResult.isExempt ? 'FİNALSIZ' : calculationResult.finalRequired.toFixed(1)}
                </span>
                {!calculationResult.isExempt && (
                  <span className="text-xs font-bold text-muted-foreground">/100</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
};

export default App;
