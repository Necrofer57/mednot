export interface Settings {
  boardCount: number;
  passingGrade: number;
  exemptionLimit: number;
  boardWeight: number;
  finalWeight: number;
}

export interface BoardGrade {
  id: number;
  name: string;
  score: number;
}

export type StatusType = 'success' | 'warning' | 'danger' | 'info';

export interface CalculationResult {
  boardAverage: number;
  finalRequired: number;
  isExempt: boolean;
  isImpossible: boolean;
  isBarajApplied: boolean;
  isRisky: boolean;
  statusMessage: string;
  statusType: StatusType;
}
