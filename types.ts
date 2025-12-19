export interface PricingBenchmark {
  serviceType: string;
  zipCode: string;
  locationName: string;
  currency: string;
  unit: string; // e.g., "hour", "visit", "sq ft"
  low: number;
  median: number;
  high: number;
  elite: number; // Top 10%
  insights: string[]; // AI generated specific market insights
  competitorCountEstimate: number;
}

export interface CalculatorState {
  hourlyRate: number;
  hoursPerJob: number;
  laborCost: number; // paying self or employees
  suppliesCost: number;
  overheadPercent: number;
}

export enum AppView {
  LANDING = 'LANDING',
  LOADING = 'LOADING',
  DASHBOARD = 'DASHBOARD'
}

export type UserTier = 'FREE' | 'PRO';
