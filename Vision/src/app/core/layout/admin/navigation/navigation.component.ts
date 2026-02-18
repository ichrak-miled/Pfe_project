// angular import
import { Component, output } from '@angular/core';

// project import
import { SharedModule } from 'src/app/shared/shared.module';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from './nav-content/nav-content.component';

@Component({
  selector: 'app-navigation',
  imports: [SharedModule, NavLogoComponent, NavContentComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // public props
  NavCollapse = output();
  NavCollapsedMob = output();
  navCollapsed = false;
  navCollapsedMob = false;

  // constructor
  constructor() {}

  // public method
  navCollapse() {
    if (window.innerWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (window.innerWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
