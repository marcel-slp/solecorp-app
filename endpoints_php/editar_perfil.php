<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? null;
$descricao = $_POST['descricao'] ?? null;

if (!isset($_POST['id'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Campos obrigatorios nao preenchidos.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE perfil 
        SET nome = ?, descricao = ?
        WHERE id = ?
    ");
    $stmt->execute([
        $nome,
        $descricao,
        $id
    ]);

    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
