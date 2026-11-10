<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM perfil ORDER BY id DESC");
    $perfis = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($perfis);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
