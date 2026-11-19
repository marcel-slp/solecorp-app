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

$email = $data['email'] ?? null;
$senha = $data['senha'] ?? null;

if (!$email || !$senha) {
  http_response_code(400);
  echo json_encode(["success" => false, "message" => "Dados invalidos"]);
  exit;
}

$hash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("UPDATE usuarios SET passwordHash = ? WHERE email = ?");
$stmt->execute([$hash, $email]);

echo json_encode([
  "success" => true,
  "message" => "Senha alterada com sucesso"
]);
?>