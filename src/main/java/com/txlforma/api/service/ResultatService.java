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

    public String genererCertificationTexte(Long id) {
        return "Certification TXL Forma pour le résultat ID : " + id;
    }

    public Resultat attribuerNoteFinale(Long idSession, Long idApprenti, Double note, String appreciation) {
        Resultat res = new Resultat();
        return resultatRepository.save(res);
    }

    public List<Resultat> getNotesApprenti(Long idApprenti) {
        return resultatRepository.findByApprentiId(idApprenti);
    }
}