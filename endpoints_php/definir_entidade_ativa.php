<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'Formato JSON inválido.'
    ]);
    exit;
}

$userId = $data['userId'] ?? null;
$entidadeAtivaId = $data['entidadeAtivaId'] ?? null;

if ($userId === null || $entidadeAtivaId === null || $entidadeAtivaId === '') {
    http_response_code(400);
    echo json_encode(['error' => 'ID do participante e obrigatorio']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE usuarios SET entidadeAtivaId = ? WHERE id = ?");

    $stmt->execute([
        $entidadeAtivaId,
        $userId
    ]);

    echo json_encode([
        'sucesso' => true
    ]);

} catch (PDOException $e) {
    http_response_code(500);

    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ]);
}
?>
