package com.example.gestion_des_documents;

import com.example.gestion_des_documents.Services.ChauffeurService;
import com.example.gestion_des_documents.Services.DocumentService;
import com.example.gestion_des_documents.Services.VehiculeService;
import com.example.gestion_des_documents.models.*;
import lombok.Data;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
@Data
public class GestionDesDocumentsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionDesDocumentsApplication.class, args);
    }

  @Bean
    CommandLineRunner start( VehiculeService vehiculeService){
        return args -> {
            System.out.println("Ajouter un véhicule");


        };
  }

}