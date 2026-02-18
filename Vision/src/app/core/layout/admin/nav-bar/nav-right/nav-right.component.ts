// angular import
import { Component, inject } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('dropdownMotion', [
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-6px)'
        })
      ),
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      transition('closed => open', [animate('240ms cubic-bezier(0.2, 0.8, 0.2, 1)')]),
      transition('open => closed', [animate('220ms cubic-bezier(0.4, 0, 0.2, 1)')])
    ])
  ]
})
export class NavRightComponent {
  // public props
  userMenuOpen = false;

  // constructor
  constructor() {
    const config = inject(NgbDropdownConfig);

    config.placement = 'bottom-right';
  }

  onUserMenuOpen(open: boolean): void {
    this.userMenuOpen = open;
  }
}
