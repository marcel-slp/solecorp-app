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
$password = $data['password'] ?? null;

if (!$email || !$password) {
  http_response_code(400);
  echo json_encode(['error' => 'Email e senha sao obrigatorios']);
  exit;
}

$stmt = $pdo->prepare("
  SELECT u.id, u.nome, u.email, u.passwordHash, u.entidadeAtivaId, p.nome as nomePerfil
  FROM usuarios u
  LEFT JOIN perfil p ON u.perfilId = p.id
  WHERE u.email = ?
");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['passwordHash'])) {
  http_response_code(401);
  echo json_encode(['error' => 'Credenciais inválidas']);
  exit;
}

session_start();
$_SESSION['user_id'] = $user['id'];

echo json_encode([
  'success' => true, 
  'message' => 'Login bem-sucedido', 
  'userId' => $user['id'], 
  'email' => $user['email'], 
  'nome' => $user['nome'], 
  'nomePerfil' => $user['nomePerfil'], 
  'entidadeAtivaId' => $user['entidadeAtivaId']
]);
?>