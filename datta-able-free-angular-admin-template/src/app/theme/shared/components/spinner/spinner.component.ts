import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spinkit } from './spinkits';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss', './spinkit-css/sk-line-material.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  private router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  isSpinnerVisible = false;
  Spinkit = Spinkit;
  readonly backgroundColor = input('#1dc4e9');
  readonly spinner = input(Spinkit.skLine);
  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }
}
