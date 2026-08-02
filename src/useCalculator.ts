import { useState, useEffect, useMemo } from 'react';
import { Settings, BoardGrade, CalculationResult } from './types';

const STORAGE_KEY_SETTINGS = 'mednot_settings';
const STORAGE_KEY_GRADES = 'mednot_grades';

const DEFAULT_SETTINGS: Settings = {
  boardCount: 5,
  passingGrade: 60,
  exemptionLimit: 85,
};

const getDefaultGrades = (count: number): BoardGrade[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}. Kurul`,
    score: 0,
  }));
};

export const useCalculator = () => {
  // Load settings from localStorage or defaults
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          boardCount: Math.max(1, Math.min(10, Number(parsed.boardCount) || 5)),
          passingGrade: Math.max(0, Math.min(100, Number(parsed.passingGrade) || 60)),
          exemptionLimit: Math.max(0, Math.min(100, Number(parsed.exemptionLimit) || 85)),
        };
      }
    } catch (e) {
      console.error('Failed to load settings from localStorage:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Load grades from localStorage or defaults
  const [grades, setGrades] = useState<BoardGrade[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GRADES);
      if (saved) {
        const parsed: BoardGrade[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load grades from localStorage:', e);
    }
    return getDefaultGrades(DEFAULT_SETTINGS.boardCount);
  });

  // Save settings on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  // Adjust grades array when boardCount changes
  useEffect(() => {
    // Prevent wiping grades if user is temporarily clearing the input to empty / 0
    if (!settings.boardCount || settings.boardCount <= 0) return;

    setGrades((prev) => {
      const currentLength = prev.length;
      const targetLength = settings.boardCount;

      if (currentLength === targetLength) return prev;

      if (currentLength < targetLength) {
        // Add new board items
        const newItems: BoardGrade[] = Array.from(
          { length: targetLength - currentLength },
          (_, idx) => ({
            id: currentLength + idx + 1,
            name: `${currentLength + idx + 1}. Kurul`,
            score: 0,
          })
        );
        const updated = [...prev, ...newItems];
        localStorage.setItem(STORAGE_KEY_GRADES, JSON.stringify(updated));
        return updated;
      } else {
        // Truncate to boardCount
        const updated = prev.slice(0, targetLength);
        localStorage.setItem(STORAGE_KEY_GRADES, JSON.stringify(updated));
        return updated;
      }
    });
  }, [settings.boardCount]);

  // Save grades on change
  const saveGrades = (updatedGrades: BoardGrade[]) => {
    setGrades(updatedGrades);
    try {
      localStorage.setItem(STORAGE_KEY_GRADES, JSON.stringify(updatedGrades));
    } catch (e) {
      console.error('Failed to save grades:', e);
    }
  };

  // Update a single grade by id
  const updateGrade = (id: number, score: number) => {
    const clampedScore = Math.max(0, Math.min(100, isNaN(score) ? 0 : score));
    const updated = grades.map((g) => (g.id === id ? { ...g, score: clampedScore } : g));
    saveGrades(updated);
  };

  // Update settings fields
  const updateSetting = (key: keyof Settings, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Reset all grades to 0
  const resetGrades = () => {
    const reset = grades.map((g) => ({ ...g, score: 0 }));
    saveGrades(reset);
  };

  // Perform calculations
  const calculationResult: CalculationResult = useMemo(() => {
    const totalCount = settings.boardCount;
    const sum = grades.reduce((acc, curr) => acc + curr.score, 0);
    const boardAverage = totalCount > 0 ? sum / totalCount : 0;

    // Formula: Final Required = (Passing Grade - (Board Average * 0.6)) / 0.4
    const rawFinalRequired = (settings.passingGrade - boardAverage * 0.6) / 0.4;
    
    // Check if exemption threshold met (and all boards filled)
    const isExempt = boardAverage >= settings.exemptionLimit;

    let finalRequired = rawFinalRequired;
    let isBarajApplied = false;

    // The 50 Bar (Baraj Sınırı): Even if raw final required is < 50, minimum is 50.0
    if (finalRequired < 50.0) {
      finalRequired = 50.0;
      isBarajApplied = true;
    }

    const isImpossible = rawFinalRequired > 100;
    const isRisky = rawFinalRequired > 80 && rawFinalRequired <= 100;

    let statusMessage = '';
    let statusType: 'success' | 'warning' | 'danger' | 'info' = 'info';

    if (isExempt) {
      statusMessage = '🎉 Tebrikler! Muafiyet sınırını geçtiniz, finale girmeniz gerekmeyebilir!';
      statusType = 'success';
    } else if (isImpossible) {
      statusMessage = `⚠️ Dikkat! Finalden 100+ (${rawFinalRequired.toFixed(1)}) almanız gerekiyor. Zorlu bir durum!`;
      statusType = 'danger';
    } else if (isRisky) {
      statusMessage = '🔥 Yüksek Hedef! Yıl sonu barajını geçmek için yüksek final notu gerekli.';
      statusType = 'warning';
    } else if (isBarajApplied) {
      statusMessage = 'ℹ️ Ortalamanız yüksek olsa dahi tıp mevzuatı gereği finalden en az 50 almalısınız.';
      statusType = 'info';
    } else {
      statusMessage = '✅ Barajı geçmek için gerekli minimum final notunuz hesaplandı.';
      statusType = 'info';
    }

    return {
      boardAverage,
      finalRequired,
      isExempt,
      isImpossible,
      isBarajApplied,
      isRisky,
      statusMessage,
      statusType,
    };
  }, [grades, settings]);

  return {
    settings,
    grades,
    calculationResult,
    updateGrade,
    updateSetting,
    resetGrades,
  };
};
