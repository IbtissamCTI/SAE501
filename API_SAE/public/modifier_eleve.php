<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Répondre immédiatement aux requêtes OPTIONS (pré-vol)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "../config/connexion_db.php";

// Récupérer les données PUT
$input = json_decode(file_get_contents('php://input'), true);

try {
    $sql = "UPDATE Eleve SET 
            nom = :nom,
            prenom = :prenom,
            birthdate = :birthdate,
            etg = :etg,
            neph = :neph,
            id_ecole = :id_ecole
            WHERE id_eleve = :id_eleve";
    
    $stmt = $pdo->prepare($sql);
    $success = $stmt->execute([
        'nom' => $input['nom'],
        'prenom' => $input['prenom'],
        'birthdate' => $input['birthdate'],
        'etg' => $input['etg'],
        'neph' => $input['neph'],
        'id_ecole' => $input['id_ecole'],
        'id_eleve' => $input['id_eleve']
    ]);

    if ($success) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Élève modifié"]);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Aucune modification"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur base de données",
        "error" => $e->getMessage()
    ]);
}
?>

  