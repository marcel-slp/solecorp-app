<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

try {
    $stmt = $pdo->query("SELECT * FROM participantes ORDER BY id DESC");
    $participantes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($participantes as &$p) {
        if (!empty($p['atletas'])) {
            $p['atletas'] = json_decode($p['atletas'], true); 
        } else {
            $p['atletas'] = [];
        }
    }
    echo json_encode($participantes);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
