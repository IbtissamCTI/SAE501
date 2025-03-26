<?php
header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json"); // Ajout de l'entête Content-Type

require "../config/connexion_db.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST')  {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $hashed_password = password_hash($data['psswrd'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO Eleve (id_ecole, nom, prenom, birthdate, etg, neph, psswrd) 
            VALUES (:id_ecole, :nom, :prenom, :birthdate, :etg, :neph, :psswrd)";
    
    $params = [
       'id_ecole' => $data['id_ecole'],
       'nom'=> $data['nom'],
       'prenom' => $data['prenom'],
       'birthdate' => $data['birthdate'],
       'etg' => $data['etg'],
       'neph' => $data['neph'],
       'psswrd'=> $hashed_password
    ];
    
    try {
        $query = $pdo->prepare($sql);
        $result = $query->execute($params);
        
        if ($result) {
            http_response_code(201);
            echo json_encode(["message" => "Etudiant Créé", "success" => true]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de la création de l'étudiant", "success" => false]);
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




 



