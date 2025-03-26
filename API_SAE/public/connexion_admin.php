<?php
header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header(header: "Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();
require "../config/connexion_db.php";


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

  $data= json_decode(file_get_contents('php://input'), true);
  
  $login =$data['login'];
  $password=$data['psswrd'];
 

  $query=$pdo->prepare("SELECT * FROM Admin WHERE login = ?");
  $query->execute([$login]);
  $user =$query->fetch(PDO::FETCH_ASSOC);
  

  if ($user && password_verify($password, $user['psswrd'])){
      
      header('Content-Type: application/json; charset=utf-8');
      echo json_encode(["message" => "Connexion reussie"]);
  }
  else {
    
      http_response_code(401);
      header('Content-Type: application/json; charset=utf-8');
      echo json_encode(["message" => "Identifiant Incorrect"]);
  }

}
