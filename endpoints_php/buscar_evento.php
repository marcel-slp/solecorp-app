<?php
header("Access-Control-Allow-Origin: *"); // ou coloque o domínio do seu frontend
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

if (!isset($_GET['id']) || empty($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID do evento e obrigatorio']);
    exit;
}

$id = trim($_GET['id']);

try {
    $stmt = $pdo->prepare("SELECT * FROM eventos WHERE id = ?");
    $stmt->execute([$id]);
    $evento = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($evento) {
        if (!empty($evento['configuracaoFases'])) {
            $evento['configuracaoFases'] = json_decode($evento['configuracaoFases'], true);
        }
        if (!empty($evento['configuracaoEvento'])) {
            $evento['configuracaoEvento'] = json_decode($evento['configuracaoEvento'], true);
        }
        if (!empty($evento['participantes'])) {
            $evento['participantes'] = json_decode($evento['participantes'], true);
        }

        echo json_encode($evento);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Evento não encontrado']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
