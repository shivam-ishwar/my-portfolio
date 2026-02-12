import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './core/portfolio.service.ts';
import { RevealDirective } from './shared/reveal.directive';
import { TerminalComponent } from './sections/terminal/terminal/terminal.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RevealDirective, TerminalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly vm$;

  constructor(private portfolio: PortfolioService) {
    this.vm$ = this.portfolio.data$;
  }

  trackByCompany = (_: number, x: any) => x?.company ?? _;
  trackByGroup = (_: number, x: any) => x?.group ?? _;
}
