package com.txlforma.api.controller;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.service.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resultats")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultatController {

    @Autowired
    private ResultatService service;

    // ✅ NOUVELLE ROUTE : Télécharger la certification
    @GetMapping("/certification/{id}")
    public ResponseEntity<byte[]> téléchargerCertification(@PathVariable Long id) {
        try {
            String contenu = service.genererCertificationTexte(id);
            byte[] contenuBytes = contenu.getBytes();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Certification_TXL_Forma.txt")
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(contenuBytes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/noter")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'INTERVENANT')")
    public ResponseEntity<?> noterEleve(@RequestBody Map<String, Object> payload) {
        try {
            Long idSession = Long.valueOf(payload.get("idSession").toString());
            Long idApprenti = Long.valueOf(payload.get("idApprenti").toString());
            Double note = Double.valueOf(payload.get("note").toString());
            String appreciation = payload.get("appreciation") != null ? payload.get("appreciation").toString() : "";

            Resultat res = service.attribuerNoteFinale(idSession, idApprenti, note, appreciation);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/apprenti/{id}")
    public ResponseEntity<List<Resultat>> getResultatsByApprenti(@PathVariable Long id) {
        return ResponseEntity.ok(service.getNotesApprenti(id));
    }

    // Autres méthodes GetMapping...
}