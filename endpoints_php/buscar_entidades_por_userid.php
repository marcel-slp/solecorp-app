<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if (!isset($_GET['userId']) || empty($_GET['userId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'UserID da entidade e obrigatorio']);
    exit;
}

$userId = trim($_GET['userId']);

try {
    $stmt = $pdo->prepare("SELECT * FROM entidades WHERE userId = ?");
    $stmt->execute([$userId]);
    $entidades = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($entidades);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
