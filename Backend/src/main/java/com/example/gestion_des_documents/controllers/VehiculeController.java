package com.example.gestion_des_documents.controllers;

import com.example.gestion_des_documents.models.Vehicule;
import com.example.gestion_des_documents.models.Voiture;
import com.example.gestion_des_documents.models.DocumentVehicule;
import com.example.gestion_des_documents.Services.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.File;




@RestController
@RequestMapping("/vehicules")
@CrossOrigin(origins = "*")
public class VehiculeController {


    @Autowired
    private VehiculeService vehiculeService;

    @PostMapping("/save")
    public ResponseEntity<?> saveVehicule(@ModelAttribute Vehicule v,
                                                 @RequestParam("fileAssurance")MultipartFile fileAssurance,
                                                 @RequestParam("fileVisite") MultipartFile fileVisite,
                                                 @RequestParam("fileCarteGrise") MultipartFile fileCarteGrise,
                                                 @RequestParam("fileVignette") MultipartFile fileVignette)throws IOException{
        String uploadDirectory = "c:/pfe/uploads/";
        File saveDir = new File(uploadDirectory);
        if (!saveDir.exists()) saveDir.mkdirs();

        if(!fileAssurance.isEmpty()){
            String fileName ="assurance_" + v.getMatricule() + "_"+ fileAssurance.getOriginalFilename();
            fileAssurance.transferTo(new File(uploadDirectory + fileName));
            v.getDocuments().setImageAssurance(fileName);
        }
        if(!fileVisite.isEmpty()){
            String fileName="visite_"+ v.getMatricule() + "_"+ fileVisite.getOriginalFilename();
            fileVisite.transferTo(new File(uploadDirectory + fileName));
            v.getDocuments().setImageVisiteTechnique(fileName);
        }

        if(!fileCarteGrise.isEmpty()){
            String fileName="carte grise_"+ v.getMatricule() + "_"+ fileCarteGrise.getOriginalFilename();
            fileCarteGrise.transferTo(new File(uploadDirectory + fileName));
            v.getDocuments().setImageCarteGrise(fileName);
        }

        if(!fileVignette.isEmpty()){
            String fileName="vignette_"+ v.getMatricule() + "_"+ fileVignette.getOriginalFilename();
            fileVignette.transferTo(new File(uploadDirectory + fileName));
            v.getDocuments().setImageVignette(fileName);
        }
        vehiculeService.saveVehiculeWithDocs(v,v.getDocuments());
        return ResponseEntity.ok().body(v);

    }
}