<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID da entidade e obrigatorio']);
    exit;
}

$id = trim($_GET['id']);

try {
    $stmt = $pdo->prepare("DELETE FROM entidades WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
