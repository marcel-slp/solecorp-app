<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$bolaoId = $_POST['bolaoId'] ?? null;
$userId = $_POST['userId'] ?? null;

if (!isset($_POST['bolaoId']) || !isset($_POST['userId'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Bolão inválido']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM bolao WHERE id = ?");
    $stmt->execute([$bolaoId]);

    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Bolão não encontrado']);
        exit;
    }

    $stmt = $pdo->prepare("
        INSERT INTO bolao_participantes (bolaoId, userId, roleBolao, habilitarPalpite)
        VALUES (?, ?, 'jogador', 1)
        ON DUPLICATE KEY UPDATE bolaoId = bolaoId
    ");

    $stmt->execute([$bolaoId, $userId]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
