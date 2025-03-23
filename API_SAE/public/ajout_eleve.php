
<?php
header("Access-Control-Allow-Origin: *");  // Permet à toutes les origines d'accéder à la ressource
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require "../config/connexion_db.php";
if ($_SERVER['REQUEST_METHOD'] == 'POST')  {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $hashed_password = password_hash($data['psswrd'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO Eleve (id_ecole, nom, prenom, birthdate, etg, neph, psswrd) 
            VALUES (:id_ecole, :nom, :prenom, :birthdate, :etg, :neph, :psswrd)";
    

    $params =[
       'id_ecole' => $data['id_ecole'],
            'nom'=> $data['nom'],
            'prenom' => $data['prenom'],
            'birthdate' => $data['birthdate'],
            'etg' => $data['etg'],
            'neph' => $data['neph'],
            'psswrd'=> $hashed_password
    ];
    http_response_code(201);
    $query = $pdo->prepare($sql)->execute($params);
    
    http_response_code(201);
    echo json_encode(["message" => "Etudiant Créé"]); 
 
  }



  /*if($_SERVER['REQUEST_METHOD'] == 'PUT'){ 
        
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
  
    } */?>



