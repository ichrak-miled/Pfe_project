import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-search',
  imports: [SharedModule],
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavSearchComponent {
  @ViewChild('mainSearch', { static: true }) mainSearch!: ElementRef;

  isOpen = false;

  searchOn(): void {
    this.isOpen = true;
    this.mainSearch.nativeElement.classList.add('open');
  }

  searchOff(): void {
    this.isOpen = false;
    this.mainSearch.nativeElement.classList.remove('open');
  }
}
