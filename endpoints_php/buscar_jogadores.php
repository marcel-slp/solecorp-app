<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

require 'db.php';

try {
    $stmt = $pdo->prepare("SELECT *, created_at as dataCriacao FROM bolao_jogadores ORDER BY nome ASC");

    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultados);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar jogadores: ' . $e->getMessage()]);
}
?>