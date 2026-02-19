package com.example.gestion_des_documents.repositories;

import com.example.gestion_des_documents.models.Chauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  java.util.List;
@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur,Long>{
    Chauffeur findByCin(String cin);
    List<Chauffeur> findByStatut(String statut);


    boolean existsByCin(String cin);
}
