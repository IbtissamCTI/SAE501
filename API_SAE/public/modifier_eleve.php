<?php
header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require "../config/connexion_db.php";



if($_SERVER['REQUEST_METHOD'] == 'PUT'){ 
      
    $data = json_decode(file_get_contents('php://input'), true);
 
    $sql = "UPDATE Eleve SET id_ecole =:id_ecole, nom = :nom,prenom = :prenom, birthdate=:birthdate ,etg = :etg,neph = :neph,psswrd = :psswrd WHERE id=:id ";
    
   
    $params =[
        'id'=>$data['id'],
        'id_ecole'=>$data['id_ecole'],
        'nom'=>$data['nom'],
        'prenom'=>$data['prenom'],
        'birthdate'=>$data['birthdate'],
        'etg'=>$data['etg'],
        'neph'=>$data['neph'],
        'psswrd'=> $hashed_password


    ];
    http_response_code(200);
    $query = $pdo->prepare($sql)->execute($params);
    
    http_response_code(200);
    echo json_encode(["message" => "etudiant modifier avec succées"]); 

  } 
  /*"id":"5",
   "id_ecole": "70",
   "nom": "GONCALVES",
   "prenom": "ruben",
   "birthdate": "2010/12/03",
   "etg": "Permis caca",
   "neph": "123456789011549",
   "psswrd": "RGoncalves"*/?>

  