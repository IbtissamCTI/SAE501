<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Répondre immédiatement aux requêtes OPTIONS (pré-vol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "../config/connexion_db.php";

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $_GET['id'] ?? ($input['id'] ?? null);

    if (!$id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ID manquant"]);
        exit;
    }

    try {
        $sql = "DELETE FROM Eleve WHERE id_eleve = :id";
        $stmt = $pdo->prepare($sql);
        $success = $stmt->execute(['id' => $id]);

        if ($success) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Élève supprimé"]);
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "Élève non trouvé"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Erreur de base de données",
            "error" => $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée"]);
}
?>

  
