<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST"); // Autorise uniquement la méthode POST
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require '../config/connexion_db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lit le corps de la requête JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérifie que l'ID de l'élève est présent
    if (!isset($data['id_eleve'])) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "L'ID de l'élève est requis"]);
        exit;
    }

    $id_eleve = $data['id_eleve'];

    // Valide que l'ID de l'élève est un entier
    if (!filter_var($id_eleve, FILTER_VALIDATE_INT)) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "L'ID de l'élève doit être un entier"]);
        exit;
    }

    try {
        // Prépare la requête SQL pour récupérer les scores de l'élève
        $sql = "SELECT thematique, score FROM test WHERE id_eleve = :id_eleve";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id_eleve' => $id_eleve]);

        $data = [
            "labels" => [],
            "values" => []
        ];

        // Récupère les résultats de la requête
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data["labels"][] = $row["thematique"];
            $data["values"][] = $row["score"];
        }

        // Si aucun résultat n'est trouvé
        if (empty($data["labels"])) {
            http_response_code(404); // Not Found
            echo json_encode(["message" => "Aucun score trouvé pour cet élève"]);
            exit;
        }

        // Retourne les données au format JSON
        http_response_code(200); // OK
        echo json_encode($data);
    } catch (PDOException $e) {
        // Gestion des erreurs PDO
        http_response_code(500); // Internal Server Error
        echo json_encode(["message" => "Erreur de base de données : " . $e->getMessage()]);
    }
} else {
    // Si la méthode de requête n'est pas POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Méthode non autorisée"]);
}
?>