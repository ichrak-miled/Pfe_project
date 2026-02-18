// angular import
import { DestroyRef, HostListener, Component, inject } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// project import
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbsComponent } from 'src/app/shared/components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-admin',
  imports: [NavBarComponent, NavigationComponent, RouterModule, CommonModule, BreadcrumbsComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger(
      'pageFadeTransition',
      [
        transition('* <=> *', [
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(6px)' }),
              animate('240ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
            ],
            { optional: true }
          )
        ])
      ]
    )
  ]
})
export class AdminComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mobileBreakpoint = 991;

  // public props
  navCollapsed = false;
  navCollapsedMob = false;
  routeAnimationKey = this.router.url;

  // constructor
  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeAnimationKey = event.urlAfterRedirects;
        this.closeMenu();
      }
    });
  }

  // public method
  navMobClick(): void {
    if (this.isMobileView()) {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (!this.isMobileView()) {
      this.navCollapsedMob = false;
    }
  }

  // this is for eslint rule
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.navCollapsedMob = false;
  }

  private isMobileView(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth <= this.mobileBreakpoint;
  }
}
