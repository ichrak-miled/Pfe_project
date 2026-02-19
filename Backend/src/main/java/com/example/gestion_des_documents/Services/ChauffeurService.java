package com.example.gestion_des_documents.Services;

import com.example.gestion_des_documents.models.Chauffeur;
import com.example.gestion_des_documents.repositories.ChauffeurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ChauffeurService {
    @Autowired
    private ChauffeurRepository chauffeurRepository;

    public Chauffeur saveChauffeur(Chauffeur c){
        if(chauffeurRepository.existsByCin(c.getCin())){
            throw new RuntimeException("Erreur: Ce cin existe déja! ");
        }
        return  chauffeurRepository.save(c);
    }
    public List<Chauffeur> getAllChauffeur(){
        return chauffeurRepository.findAll();
    }
    public Chauffeur getChauffeurById(Long id){
        return chauffeurRepository.findById(id).orElse(null);
    }
    public void deleteChauffeur(Long id){
        chauffeurRepository.deleteById(id);
    }
    public Chauffeur updateChauffeur(Long id, Chauffeur chauffeurDetails){
        Chauffeur chauffeur = chauffeurRepository.findById(id).orElse(null);
        if (chauffeur !=null) {

            chauffeur.setTelephone(chauffeurDetails.getTelephone());

            chauffeur.setStatut(chauffeurDetails.getStatut());

            chauffeur.setMotdepasse(chauffeurDetails.getMotdepasse());
        }
            return null;

    }



}
