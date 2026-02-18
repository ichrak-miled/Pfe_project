import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-vehicle-form-field',
  imports: [CommonModule],
  templateUrl: './vehicle-form-field.component.html',
  styleUrls: ['./vehicle-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VehicleFormFieldComponent {
  readonly forId = input.required<string>();
  readonly label = input.required<string>();
  readonly required = input<boolean>(false);
  readonly hint = input<string>('');
  readonly customError = input<string>('');
  readonly control = input.required<AbstractControl | null>();

  focused = false;

  onFocus(isFocused: boolean): void {
    this.focused = isFocused;
  }

  isInvalid(): boolean {
    const control = this.control();
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasValue(): boolean {
    const control = this.control();
    if (!control) {
      return false;
    }

    const value = control.value;
    return value !== null && value !== undefined && `${value}`.trim() !== '';
  }

  getErrorMessage(): string {
    if (this.customError()) {
      return this.customError();
    }

    const errors = this.control()?.errors;
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'Ce champ est requis.';
    }

    if (errors['email']) {
      return 'Veuillez saisir un email valide.';
    }

    if (errors['minlength']) {
      return `Minimum ${errors['minlength'].requiredLength} caracteres.`;
    }

    if (errors['maxlength']) {
      return `Maximum ${errors['maxlength'].requiredLength} caracteres.`;
    }

    if (errors['min']) {
      return `La valeur minimale est ${errors['min'].min}.`;
    }

    if (errors['max']) {
      return `La valeur maximale est ${errors['max'].max}.`;
    }

    return 'Valeur invalide.';
  }
}
