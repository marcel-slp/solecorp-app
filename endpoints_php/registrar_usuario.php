<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$nome = $data['nome'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$nome || !$email || !$password) {
  http_response_code(400);
  echo json_encode(['error' => 'Nome, email e senha sao obrigatorios']);
  exit;
}

$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
  http_response_code(409);
  echo json_encode(['error' => 'Email ja cadastrado']);
  exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, passwordHash, perfilId) VALUES (?, ?, ?, 'a2b1c')");
$stmt->execute([$nome, $email, $hash]);

echo json_encode(['success' => true, 'message' => 'Usuario criado com sucesso']);
?>