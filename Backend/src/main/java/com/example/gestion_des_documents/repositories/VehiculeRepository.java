package com.example.gestion_des_documents.repositories;


import com.example.gestion_des_documents.models.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

}
