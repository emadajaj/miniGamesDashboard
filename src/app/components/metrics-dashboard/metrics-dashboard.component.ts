import { Component, OnInit } from '@angular/core';
import { MetricsService, Metric } from '../../services/metrics.service';

@Component({
  selector: 'app-metrics-dashboard',
  templateUrl: './metrics-dashboard.component.html',
  styleUrl: './metrics-dashboard.component.css',
  standalone: false,
})
export class MetricsDashboardComponent implements OnInit {
  metrics: Metric[] = [];

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metrics = this.metricsService.getMetrics();
  }

  formatNumber(value: number | null): string {
    if (value === null) return '';
    
    // Special formatting for balance with 2 decimal places
    if (value.toString().includes('.')) {
      return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    // All other numbers with no decimal places
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'user': return 'user-metric';
      case 'competition': return 'competition-metric';
      case 'financial': return 'financial-metric';
      case 'balance': return 'balance-metric';
      default: return '';
    }
  }
}
