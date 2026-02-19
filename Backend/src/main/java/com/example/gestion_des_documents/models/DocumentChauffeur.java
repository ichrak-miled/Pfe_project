package com.example.gestion_des_documents.models;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.metamodel.internal.StandardEmbeddableInstantiator;

import javax.xml.crypto.dsig.spec.XSLTTransformParameterSpec;
import java.time.LocalDate;

@Entity
@Table (name = "documents_chauffeur")
@Data
public class DocumentChauffeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDocument;

    private String titre;
    private String statut;
    private String urlFichier;
    private LocalDate dateExpiration;


@ManyToOne
@JoinColumn(name = "id_chauffeur")
    private Chauffeur chauffeur;


}
