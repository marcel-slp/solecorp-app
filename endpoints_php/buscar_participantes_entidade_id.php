<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require 'db.php';

if (!isset($_GET['entidadeId']) || empty($_GET['entidadeId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'EntidadeID obrigatorio']);
    exit;
}

$entidadeId = trim($_GET['entidadeId']);

try {
    $stmt = $pdo->prepare("SELECT * FROM participantes WHERE entidadeId = ?");
    $stmt->execute([$entidadeId]);
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
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
