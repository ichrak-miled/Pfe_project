import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculeService } from '../../services/vehicule';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-vehicule',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-vehicule.html',
  styleUrl: './add-vehicule.scss',
})
export class AddVehicule {
  vehicule = {
     matricule: '',
      marque: '',
      modele:'',
      puissance:0,
      carburant:'Essence',
      places:0,
      année:2024

     };

     files:{[key:string]: File}={};

  selectedFile: File | null = null;

  constructor(
    private service: VehiculeService,
  private router:Router) {}

  choisirDocument(event: any, type:string) {
    this.files[type] = event.target.files[0];
  }

  onAnnuler(){
this.router.navigate(['/dashboard/default']);
  }

  onResetForm(){
    this.vehicule = {
      matricule:'',
      marque:'',
      modele:'',
      puissance:0,
      carburant:'Essence',
      places:0,
      année:2024
    };
    this.files = {};
  }

  onSubmit(){

    const payload = new FormData();
    payload.append('matricule', this.vehicule.matricule);
     payload.append('marque', this.vehicule.marque);
      payload.append('modele', this.vehicule.modele);
       payload.append('puissance', this.vehicule.puissance.toString());
        payload.append('carburant', this.vehicule.carburant);
        Object.keys(this.files).forEach(key => {
          if (this.files[key]){
            payload.append(key, this.files[key]);
          }
        });
        this.service.addVehicule(payload).subscribe({
          next: (res)=>{
            Swal.fire({
              title:'Véhicule Enregistré !',
              text:'Les données ont été ajoutées avec succés .',
              icon:'success',
              timer: 2000,
              showCancelButton: false,
            }).then(() =>this.onAnnuler());
          },
          error: (err)=>{
            console.error("Détails de l'erreur:",err);
            Swal.fire({
              title:'Erreur !',
              text:'Connexion au serveur échouée. Vérifiez votre backend.',
              icon:'error',
              confirmButtonText:'Réessayer'
            });
          }
        });
  }

}
