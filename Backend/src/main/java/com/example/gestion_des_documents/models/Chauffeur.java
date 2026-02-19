package com.example.gestion_des_documents.models;

 import jakarta.persistence.*;
 import lombok.Data;
 import lombok.NoArgsConstructor;
 import lombok.AllArgsConstructor;
 import java.time.LocalDate;
 import java.time.LocalDate;
 import java.util.List;


@Entity
@Table(name ="chauffeurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chauffeur {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long idChauffeur;

    private String nom;
    private String prenom;

    @Column(unique = true)
    private String numPermis;
    @Column(unique = true)
    private String cin;

    private String telephone;
    private String email;
    private String motdepasse;
    private String statut;
    private LocalDate dateEmbauche;


    @OneToMany(mappedBy = "chauffeur" , cascade = CascadeType.ALL)
    private List<DocumentChauffeur> documents;


}
