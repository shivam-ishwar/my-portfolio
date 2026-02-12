import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalComponent implements OnInit {
  @Input({ required: true }) lines!: string[];

  rendered = signal<string[]>([]);
  private idx = 0;

  ngOnInit() {
    this.tick();
  }

  trackByIdx = (i: number) => i;

  private tick() {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) {
      this.rendered.set(this.lines);
      return;
    }

    if (this.idx >= this.lines.length) return;

    const current = this.lines[this.idx];
    const prev = this.rendered();

    // “type” each line quickly
    let i = 0;
    const interval = window.setInterval(() => {
      const partial = current.slice(0, i++);
      const next = [...prev, partial];
      this.rendered.set(next);

      if (i > current.length) {
        window.clearInterval(interval);
        this.idx++;
        // lock full line then move to next after a tiny pause
        this.rendered.set([...prev, current]);
        window.setTimeout(() => this.tick(), 120);
      }
    }, 10);
  }
}