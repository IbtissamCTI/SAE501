<?php

require "../config/connexion_db.php";

if($_SERVER['REQUEST_METHOD'] === 'DELETE'){ 
   
    $data = json_decode(file_get_contents('php://input'), true);
 
    $sql = "DELETE  FROM Eleve WHERE id=:id ";
    
   
    $params =[
        'id'=>$data['id']
    ];

    $query = $pdo->prepare($sql);
    $query->execute($params); 

    http_response_code(200);
  echo json_encode(["message" => "Eleve Supprimer"]); 

  }

  
