import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { VehiculeService } from '../../services/vehicule';
import { VehicleFormFieldComponent } from './components/vehicle-form-field/vehicle-form-field.component';
import { VehicleDocumentUploadComponent } from './components/vehicle-document-upload/vehicle-document-upload.component';

type VehiculeDocumentKey = 'assurance' | 'visite' | 'carteGrise' | 'vignette';
type SectionKey = 'vehicleInfo' | 'technicalDetails' | 'documentsUpload';

interface DocumentConfig {
  key: VehiculeDocumentKey;
  title: string;
  description: string;
  accept: string;
  required: boolean;
}

@Component({
  selector: 'app-add-vehicule',
  imports: [CommonModule, ReactiveFormsModule, VehicleFormFieldComponent, VehicleDocumentUploadComponent],
  templateUrl: './add-vehicule.html',
  styleUrls: ['./add-vehicule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('pageFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('360ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('sectionStagger', [
      transition(':enter', [
        query(
          '.vehicle-section',
          [
            style({ opacity: 0, transform: 'translateY(14px)' }),
            stagger(90, animate('420ms cubic-bezier(0.2, 0.8, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' })))
          ],
          { optional: true }
        )
      ])
    ]),
    trigger('sectionExpand', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden'
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden'
        })
      ),
      transition('open <=> closed', animate('220ms ease'))
    ])
  ]
})
export class AddVehicule {
  private readonly fb = new FormBuilder();
  private readonly requiredDocuments: VehiculeDocumentKey[] = ['assurance', 'carteGrise'];

  readonly vehiculeForm = this.fb.nonNullable.group({
    matricule: ['', [Validators.required]],
    marque: ['', [Validators.required]],
    modele: ['', [Validators.required]],
    puissance: [5, [Validators.required, Validators.min(1)]],
    carburant: this.fb.nonNullable.control<'Essence' | 'Diesel'>('Essence', [Validators.required]),
    places: [5, [Validators.required, Validators.min(1)]],
    annee: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]]
  });

  readonly sectionOpen = signal<Record<SectionKey, boolean>>({
    vehicleInfo: true,
    technicalDetails: true,
    documentsUpload: true
  });

  readonly submitAttempted = signal(false);
  readonly isSubmitting = signal(false);

  readonly documentConfigs: DocumentConfig[] = [
    {
      key: 'assurance',
      title: "Certificat d'assurance",
      description: 'Formats: PDF, JPG, PNG',
      accept: '.pdf,image/*',
      required: true
    },
    {
      key: 'visite',
      title: 'Visite technique',
      description: 'Formats: PDF, JPG, PNG',
      accept: '.pdf,image/*',
      required: false
    },
    {
      key: 'carteGrise',
      title: 'Carte grise',
      description: 'Formats: PDF, JPG, PNG',
      accept: '.pdf,image/*',
      required: true
    },
    {
      key: 'vignette',
      title: 'Vignette',
      description: 'Formats: PDF, JPG, PNG',
      accept: '.pdf,image/*',
      required: false
    }
  ];

  files: Partial<Record<VehiculeDocumentKey, File>> = {};

  constructor(
    private readonly service: VehiculeService,
    private readonly router: Router
  ) {}

  onAnnuler(): void {
    this.router.navigate(['/dashboard']);
  }

  onResetForm(): void {
    this.vehiculeForm.reset({
      matricule: '',
      marque: '',
      modele: '',
      puissance: 5,
      carburant: 'Essence',
      places: 5,
      annee: new Date().getFullYear()
    });

    this.files = {};
    this.submitAttempted.set(false);
  }

  onDocumentChanged(type: VehiculeDocumentKey, file: File | null): void {
    if (file) {
      this.files[type] = file;
    } else {
      delete this.files[type];
    }
  }

  onSubmit(): void {
    this.submitAttempted.set(true);

    if (this.vehiculeForm.invalid || !this.hasRequiredDocuments()) {
      this.vehiculeForm.markAllAsTouched();
      return;
    }

    const vehicule = this.vehiculeForm.getRawValue();
    const payload = new FormData();
    payload.append('matricule', vehicule.matricule);
    payload.append('marque', vehicule.marque);
    payload.append('modele', vehicule.modele);
    payload.append('puissance', vehicule.puissance.toString());
    payload.append('carburant', vehicule.carburant);
    payload.append('places', vehicule.places.toString());
    payload.append('annee', vehicule.annee.toString());

    (Object.keys(this.files) as VehiculeDocumentKey[]).forEach((key) => {
      const file = this.files[key];
      if (file) {
        payload.append(key, file, file.name);
      }
    });

    this.isSubmitting.set(true);
    this.service
      .addVehicule(payload)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.onResetForm();
          Swal.fire({
            title: 'Vehicule enregistre',
            text: 'Le vehicule a ete ajoute avec succes.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          }).then(() => this.onAnnuler());
        },
        error: () => {
          Swal.fire({
            title: 'Erreur',
            text: "Connexion au serveur echouee. Veuillez verifier l'API backend.",
            icon: 'error',
            confirmButtonText: 'Reessayer'
          });
        }
      });
  }

  toggleSection(section: SectionKey): void {
    this.sectionOpen.update((state) => ({ ...state, [section]: !state[section] }));
  }

  isSectionOpen(section: SectionKey): boolean {
    return this.sectionOpen()[section];
  }

  isDocumentInvalid(key: VehiculeDocumentKey): boolean {
    return this.submitAttempted() && this.requiredDocuments.includes(key) && !this.files[key];
  }

  trackDocument(_: number, item: DocumentConfig): VehiculeDocumentKey {
    return item.key;
  }

  private hasRequiredDocuments(): boolean {
    return this.requiredDocuments.every((key) => !!this.files[key]);
  }
}
