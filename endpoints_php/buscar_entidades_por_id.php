<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID da entidade e obrigatorio']);
    exit;
}

$id = trim($_GET['id']);

try {
    $stmt = $pdo->prepare("SELECT * FROM entidades WHERE id = ?");
    $stmt->execute([$id]);
    $entidades = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($entidades);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
