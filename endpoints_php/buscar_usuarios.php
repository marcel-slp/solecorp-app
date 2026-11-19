<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

try {
    $stmt = $pdo->query("SELECT u.id, u.nome as 'nome', u.email, u.created_at as 'criadoEm', p.nome as 'nomePerfil' FROM usuarios u JOIN perfil p ON u.perfilId = p.id ORDER BY u.id DESC");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
