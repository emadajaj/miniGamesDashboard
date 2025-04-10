import { Injectable } from '@angular/core';

export interface Metric {
  id: string;
  value: number | null;
  label: string;
  category: 'user' | 'competition' | 'financial' | 'balance';
  isActive?: boolean;
  isHighlighted?: boolean;
  isWide?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  getMetrics(): Metric[] {
    return [
      {
        id: 'users',
        value: 1630660,
        label: 'Users',
        category: 'user'
      },
      {
        id: 'competitions',
        value: 11988,
        label: 'Competitions',
        category: 'competition'
      },
      {
        id: 'pendingCompetitions',
        value: 8,
        label: 'Pending Competitions',
        category: 'competition'
      },
      {
        id: 'activeCompetitions',
        value: null,
        label: 'Active Competitions',
        category: 'competition',
        isActive: true
      },
      {
        id: 'finishedCompetitions',
        value: 11980,
        label: 'Finished Competitions',
        category: 'competition'
      },
      {
        id: 'gameTypes',
        value: 197,
        label: 'Game Types',
        category: 'competition'
      },
      {
        id: 'awards',
        value: 12270,
        label: 'Awards',
        category: 'financial'
      },
      {
        id: 'giftCards',
        value: 33,
        label: 'Gift Cards',
        category: 'financial'
      },
      {
        id: 'balance',
        value: 3244.39,
        label: 'USD Balance',
        category: 'balance',
        isWide: true
      }
    ];
  }
} 