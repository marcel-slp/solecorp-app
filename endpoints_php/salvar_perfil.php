<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? null;
$descricao = $_POST['descricao'] ?? null;

if (!isset($_POST['id']) || !isset($_POST['nome'])) {
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO perfil (id, nome, descricao) VALUES (?, ?, ?)");
    $stmt->execute([
        $id,
        $nome,
        $descricao
    ]);

    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
