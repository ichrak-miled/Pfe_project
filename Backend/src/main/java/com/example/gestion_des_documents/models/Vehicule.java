package com.example.gestion_des_documents.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data @NoArgsConstructor @AllArgsConstructor
public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVehicule;

    @Column(unique = true)
    private String matricule;
    private String marque;
    private String modele;
    private int nbrPlaces;
    private int annee;

    @OneToOne(mappedBy = "vehicule" , cascade = CascadeType.ALL)
    private DocumentVehicule documents;
}
