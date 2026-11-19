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
    $stmt = $pdo->prepare("SELECT * FROM eventos WHERE entidadeId = ?");
    $stmt->execute([$entidadeId]);
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($eventos as &$e) {
        if (!empty($e['participantes'])) {
            $e['participantes'] = json_decode($e['participantes'], true); 
        } else {
            $e['participantes'] = [];
        }
        if (!empty($e['configuracaoFases'])) {
            $e['configuracaoFases'] = json_decode($e['configuracaoFases'], true); 
        } else {
            $e['configuracaoFases'] = [];
        }
    }
    echo json_encode($eventos);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
