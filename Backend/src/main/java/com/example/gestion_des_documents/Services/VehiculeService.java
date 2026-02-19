package com.example.gestion_des_documents.Services;


import com.example.gestion_des_documents.models.Vehicule;
import com.example.gestion_des_documents.models.DocumentVehicule;
import com.example.gestion_des_documents.repositories.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class VehiculeService {
    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Transactional
    public Vehicule saveVehiculeWithDocs( Vehicule v , DocumentVehicule docs) {
        if (docs != null) {
            docs.setVehicule(v);
            v.setDocuments(docs);
        }

        return vehiculeRepository.save(v);
    }
}
