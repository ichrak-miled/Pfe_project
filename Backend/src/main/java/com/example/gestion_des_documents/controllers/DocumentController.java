package com.example.gestion_des_documents.controllers;


import com.example.gestion_des_documents.models.DocumentChauffeur;
import com.example.gestion_des_documents.Services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")

public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @GetMapping("/all")
    public  List<DocumentChauffeur> getAll(){
        return documentService.getAllDocuments();
    }

    @PostMapping("/add")
    public  DocumentChauffeur add(@RequestBody DocumentChauffeur doc){
        return documentService.saveDocument(doc);
    }


}