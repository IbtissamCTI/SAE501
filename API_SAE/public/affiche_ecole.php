<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require "../config/connexion_db.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        // Vérifier si un ID spécifique est demandé
        if (isset($_GET['id_ecole'])) {
            $id_ecole = $_GET['id_ecole'];
            $sql = "SELECT id_ecole, etablissement FROM Ecole WHERE id_ecole = :id_ecole";
            $query = $pdo->prepare($sql);
            $query->bindParam(':id_ecole', $id_ecole, PDO::PARAM_INT);
            $query->execute();
            $ecole = $query->fetch(PDO::FETCH_ASSOC);
            
            if ($ecole) {
                echo json_encode($ecole);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Auto-école non trouvée", "success" => false]);
            }
        } else {
            // Récupérer toutes les auto-écoles
            $sql = "SELECT id_ecole, etablissement FROM Ecole";
            $query = $pdo->prepare($sql);
            $query->execute();
            $ecoles = $query->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode($ecoles);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["message" => "Erreur de base de données: " . $e->getMessage(), "success" => false]);
    }
}

// Gestion des requêtes OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>