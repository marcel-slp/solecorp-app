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

try {
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $email = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($email) {
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "O email existe, pode redefinir a senha."
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            'error' => 'Usuario nao encontrado'
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        'error' => $e->getMessage()
    ]);
}
?>