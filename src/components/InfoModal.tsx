import React from 'react';
import { X, HelpCircle, ShieldAlert, Award, Calculator, Code, UserCheck, CheckCircle2 } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-5 transform transition-all duration-300 scale-100 opacity-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-foreground">Bilgi & Çalışma Mantığı</h3>
              <p className="text-xs text-muted-foreground">MedNot Tıp Fakültesi Not Hesaplayıcı</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          {/* Section 1: How App Works */}
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>MedNot Nasıl Çalışır?</span>
            </div>
            <p className="text-xs text-muted-foreground">
              MedNot, tıp öğrencilerinin dönem içi kurul notlarını, yıl sonu geçme notunu ve finalsiz geçme barajlarını analiz ederek final sınavında alması gereken hedef notu anında hesaplar:
            </p>
            <ul className="text-xs space-y-1.5 list-disc list-inside text-foreground/90 font-medium">
              <li>Girilen kurul sayılarına göre anlık **Kurul Ortalaması** çıkarılır.</li>
              <li>Kurul ve Final ağırlık oranları fakültenize göre ayarlanabilir (varsayılan: **%60 Kurul**, **%40 Final**).</li>
              <li>Değerler ve ayarlar otomatik olarak cihazınıza kaydedilir (`localStorage`).</li>
            </ul>
          </div>

          {/* Section 2: Calculation Formula */}
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm">
              <Calculator className="w-4 h-4 text-primary" />
              <span>Hesaplama Formülü</span>
            </div>
            <div className="p-2.5 rounded-xl bg-background border text-xs font-mono text-primary font-bold text-center">
              Gerekli Final Notu = [Geçme Notu - (Kurul Ortalaması × Kurul Oranı)] / Final Oranı
            </div>
          </div>

          {/* Section 3: 50 Barajı Rule */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-foreground">
            <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>50 Baraj Sınırı Kuralı</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Türkiye tıp fakülteleri sınav yönetmelikleri gereği, kurul ortalamanız 100 dahi olsa final sınavından <strong>en az 50.0</strong> almanız zorunludur. Hesaplanan değer 50'den düşük çıksa bile sistem 50.0 barajını otomatik uygular.
            </p>
          </div>

          {/* Section 4: Finalsiz Geçme */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-foreground">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              <Award className="w-4 h-4" />
              <span>Finalsiz Geçme Şartı</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Kurul ortalamanız belirlenen Finalsiz Sınırına (örn. 85.0) ulaştığında veya geçtiğinde öğrenci finale girmeden doğrudan geçmiş sayılır (**FİNALSIZ**).
            </p>
          </div>

          {/* Developer Credits Section */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-primary/10 via-blue-500/10 to-indigo-500/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-md">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block">
                  Uygulama Geliştiricisi
                </span>
                <span className="text-sm font-extrabold text-foreground bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  Ahmet Efe Sezgin
                </span>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-background border border-border text-foreground shadow-sm">
              MedNot v1.0
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-primary/20 active:scale-[0.99]"
          >
            Anlaşıldı
          </button>
        </div>
      </div>
    </div>
  );
};
