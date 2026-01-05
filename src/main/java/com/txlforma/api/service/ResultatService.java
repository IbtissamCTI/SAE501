package com.txlforma.api.service;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.repository.ResultatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResultatService {

    @Autowired
    private ResultatRepository resultatRepository;

    // Correction pour : genererCertificationTexte
    public String genererCertificationTexte(Long id) {
        return "Certification TXL Forma pour le résultat ID : " + id;
    }

    // Correction pour : attribuerNoteFinale
    public Resultat attribuerNoteFinale(Long idSession, Long idApprenti, Double note, String appreciation) {
        Resultat res = new Resultat();
        // Logique de sauvegarde simplifiée
        return resultatRepository.save(res);
    }

    // Correction pour : getNotesApprenti
    public List<Resultat> getNotesApprenti(Long idApprenti) {
        return resultatRepository.findByApprentiId(idApprenti);
    }
}