<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? null;
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$perfilId = $_POST['perfilId'] ?? null;

if (!isset($_POST['id'])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Campos obrigatorios nao preenchidos.']);
    exit;
}

$hash = null;
if (isset($_POST['password'])) {
    $hash = password_hash($password, PASSWORD_DEFAULT);
}

try {
    if ($hash !== null) {
        $stmt = $pdo->prepare("
            UPDATE usuarios 
            SET nome = ?, email = ?, passwordHash = ?, perfilId = ?
            WHERE id = ?
        ");
        $stmt->execute([$nome, $email, $hash, $perfilId, $id]);
    } else {
        $stmt = $pdo->prepare("
            UPDATE usuarios 
            SET nome = ?, email = ?, perfilId = ?
            WHERE id = ?
        ");
        $stmt->execute([$nome, $email, $perfilId, $id]);
    }

    echo json_encode(['sucesso' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
