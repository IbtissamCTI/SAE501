<?php
header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();
require "../config/connexion_db.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['login'], $data['psswrd'])) {
        http_response_code(400);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["message" => "Données manquantes"]);
        exit;
    }

    $login = strtolower(trim($data['login']));

    $query = $pdo->prepare("SELECT * FROM Eleve WHERE LOWER(CONCAT(prenom, nom)) = ?");
    $query->execute([$login]);
    $user = $query->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data['psswrd'], $user['psswrd'])) {
        $_SESSION['user_id'] = $user['id']; // Enregistrer l'ID utilisateur en session
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["message" => "Connexion réussie"]);
    } else {
        http_response_code(401);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(["message" => "Identifiant incorrect"]);
    }
    
}


