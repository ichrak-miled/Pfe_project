package com.example.gestion_des_documents.models;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class DocumentVehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDoc;
    private String urlAssurance;
    private LocalDate dateExpAssurance;

    private String urlVisiteTechnique;
    private LocalDate dateExpVisite;

    private String urlVignette;
    private String urlCarteGrise;

    @OneToOne
    @JoinColumn( name= "id_vehicule")
    private Vehicule vehicule;

    private String assurance;
    private String carteGrise;
    private String visiteTechnique;
    private String vignette;


    private String imageAssurance;
    private String imageVisiteTechnique;
    private String imageCarteGrise;
    private String imageVignette;


    public String getImageAssurance(){
        return imageAssurance;
    }
    public void setImageAssurance(String imageAssurance){
        this.imageAssurance = imageAssurance;
    }


    public String getImageVisiteTechnique(){
        return imageVisiteTechnique;
    }
    public void setImageVisiteTechnique(String imageVisiteTechnique){
        this.imageVisiteTechnique = imageVisiteTechnique;
    }

    public String getImageCarteGrise(){
        return imageCarteGrise;
    }
    public void setImageCarteGrise(String imageCarteGrise){
        this.imageCarteGrise = imageCarteGrise;
    }


    public String getImageVignette(){
        return imageVignette;
    }
    public void setImageVignette (String imageVignette){
        this.imageVignette = imageVignette;
    }







}
