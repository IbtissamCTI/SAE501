<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();
require "../config/connexion_db.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id_eleve'])) {
        // Requête pour un élève spécifique
        $sql = "
            SELECT 
                Eleve.id_eleve, 
                Eleve.nom, 
                Eleve.prenom, 
                Eleve.etg, 
                Eleve.neph, 
                Eleve.psswrd, 
                Ecole.etablissement, 
                Avis.contenu
            FROM 
                Eleve
            LEFT JOIN 
                Ecole ON Eleve.id_ecole = Ecole.id_ecole
            LEFT JOIN 
                Avis ON Avis.id_eleve = Eleve.id_eleve
            WHERE 
                Eleve.id_eleve = :id_eleve
        ";
        $query = $pdo->prepare($sql);
        $query->execute(['id_eleve' => $_GET['id_eleve']]);
        $students = $query->fetchAll(PDO::FETCH_ASSOC);
    } else {
        // Requête pour tous les élèves
        $sql = "
            SELECT 
                Eleve.id_eleve, 
                Eleve.nom, 
                Eleve.prenom, 
                Eleve.etg, 
                Eleve.neph, 
                Eleve.psswrd, 
                Ecole.etablissement, 
                Avis.contenu
            FROM 
                Eleve
            LEFT JOIN 
                Ecole ON Eleve.id_ecole = Ecole.id_ecole
            LEFT JOIN 
                Avis ON Avis.id_eleve = Eleve.id_eleve
            ORDER BY 
                Eleve.id_eleve
        ";
        $students = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($students);
}
