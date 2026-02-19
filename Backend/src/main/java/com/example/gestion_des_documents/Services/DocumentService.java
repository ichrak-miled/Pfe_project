package com.example.gestion_des_documents.Services;

import com.example.gestion_des_documents.models.DocumentChauffeur;
import com.example.gestion_des_documents.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public List<DocumentChauffeur> getAllDocuments(){
        return documentRepository.findAll();
    }

    public DocumentChauffeur saveDocument(DocumentChauffeur doc){
        return documentRepository.save(doc);
    }
}