package com.example.gestion_des_documents.repositories;

import com.example.gestion_des_documents.models.DocumentChauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

    public interface DocumentRepository extends JpaRepository<DocumentChauffeur, Long> { }


