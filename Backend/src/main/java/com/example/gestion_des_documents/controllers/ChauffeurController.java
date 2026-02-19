package com.example.gestion_des_documents.controllers;

import com.example.gestion_des_documents.models.Chauffeur;
import com.example.gestion_des_documents.Services.ChauffeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/chauffeurs")
@CrossOrigin("*")

public class ChauffeurController {


       @Autowired
     private ChauffeurService ChauffeurService;

       @GetMapping("/all")
    public List<Chauffeur> getAll(){

           return ChauffeurService.getAllChauffeur();
       }
       @GetMapping("/{id}")
    public Chauffeur getById(@PathVariable Long id){

           return ChauffeurService.getChauffeurById(id);
       }
       @PostMapping("/add")
    public Chauffeur add(@RequestBody Chauffeur c){

           return ChauffeurService.saveChauffeur(c);
       }
       @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
           ChauffeurService.deleteChauffeur(id);
       }

    @GetMapping("/hello")
    public String sayHello() {
        return "Chauffeur Controller is Working!";
    }


    @PutMapping("/update/{id}")
    public Chauffeur update(@PathVariable Long id, @RequestBody Chauffeur c ){
        return ChauffeurService.updateChauffeur(id, c);}


}
