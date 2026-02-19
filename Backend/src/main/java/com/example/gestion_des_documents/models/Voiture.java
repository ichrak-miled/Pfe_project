package com.example.gestion_des_documents.models;

  import jakarta.persistence.Entity;
  import lombok.*;

  @Entity
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @EqualsAndHashCode(callSuper = true)
public class Voiture extends Vehicule {

      private String typaCarburant;
      private int puissanceFiscale;


      public int getPuissanceFiscale() {
          return puissanceFiscale;
      }

      public void setPuisssanceFiscale(int puissanceFiscale){
          this.puissanceFiscale = puissanceFiscale;
      }
  }