package com.txlforma.api.service;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.model.Session;
import com.txlforma.api.repository.ResultatRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ResultatService {

    @Autowired private ResultatRepository resultatRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private SessionRepository sessionRepository;

    public Resultat attribuerNoteFinale(Long idSession, Long idApprenti, Double note, String appreciation) {
        Session session = sessionRepository.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));
        Utilisateur apprenti = utilisateurRepository.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));

        if (!session.getParticipants().contains(apprenti)) {
            throw new RuntimeException("Cet apprenti n'est pas inscrit à cette session !");
        }

        Resultat resultat = new Resultat();
        resultat.setSession(session);
        resultat.setApprenti(apprenti);
        resultat.setNote(note);
        resultat.setAppreciation(appreciation);
        resultat.setDateExamen(LocalDate.now());

        return resultatRepository.save(resultat);
    }

    // ✅ NOUVEAU : Générer le texte de la certification
    public String genererCertificationTexte(Long idResultat) {
        Resultat res = resultatRepository.findById(idResultat)
                .orElseThrow(() -> new RuntimeException("Résultat introuvable"));

        if (!res.getValide()) {
            throw new RuntimeException("Certification indisponible : Examen non validé.");
        }

        return "==========================================\n" +
                "       CERTIFICAT DE RÉUSSITE - TXL FORMA\n" +
                "==========================================\n\n" +
                "Nous certifions que Mme/M. " + res.getApprenti().getNom().toUpperCase() + " " + res.getApprenti().getPrenom() + "\n" +
                "a validé avec succès la formation : " + res.getSession().getFormation().getTitre() + "\n" +
                "le " + res.getDateExamen() + " avec la note de " + res.getNote() + "/20.\n\n" +
                "Appréciation du formateur : " + res.getAppreciation() + "\n\n" +
                "Fait à " + res.getSession().getLieu() + ", le " + LocalDate.now() + "\n" +
                "Signature de la direction TXL Forma";
    }

    public List<Resultat> getAllResultats() { return resultatRepository.findAll(); }
    public List<Resultat> getNotesApprenti(Long idApprenti) { return resultatRepository.findByApprentiId(idApprenti); }
    public Resultat getResultatById(Long id) { return resultatRepository.findById(id).orElseThrow(() -> new RuntimeException("Note introuvable")); }
    public Resultat ajouterNote(Resultat r, Long a, Long s) { /* ancienne méthode gardée */ return null; }
}