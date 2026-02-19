package com.example.gestion_des_documents.models;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Camion  extends  Vehicule{
    private double chargeUtile;
    private int nbreEssieux;
}
