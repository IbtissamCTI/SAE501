<?php
// Autoriser les requêtes cross-origin (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Inclure le fichier de connexion à la base de données
require '../config/connexion_db.php';

// Vérifier si la méthode de la requête est GET et si l'action est 'getEleves'
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getEleves') {
    try {
        // Requête SQL pour récupérer la liste des élèves
        $sql = "SELECT id_eleve, CONCAT(prenom, ' ', nom) AS nom_complet FROM Eleve";
        $stmt = $pdo->query($sql); // Exécuter la requête
        $eleves = $stmt->fetchAll(PDO::FETCH_ASSOC); // Récupérer les résultats

        // Vérifier si des élèves ont été trouvés
        if (empty($eleves)) {
            http_response_code(404); // Code HTTP 404 (Non trouvé)
            echo json_encode(["message" => "Aucun élève trouvé"]);
        } else {
            http_response_code(200); // Code HTTP 200 (OK)
            echo json_encode($eleves); // Renvoyer les élèves au format JSON
        }
    } catch (PDOException $e) {
        // En cas d'erreur de base de données
        http_response_code(500); // Code HTTP 500 (Erreur serveur)
        echo json_encode(["message" => "Erreur de base de données : " . $e->getMessage()]);
    }
} else {
    // Si la méthode n'est pas GET ou si l'action n'est pas 'getEleves'
    http_response_code(405); // Code HTTP 405 (Méthode non autorisée)
    echo json_encode(["message" => "Méthode non autorisée"]);
}
?>