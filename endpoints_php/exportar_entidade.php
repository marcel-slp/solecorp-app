
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'Formato JSON inválido.'
    ]);
    exit;
}

$entidadeOrigemId = $data['entidadeOrigemId'] ?? null;
$entidadeDestinoId = $data['entidadeDestinoId'] ?? null;

if (
    $entidadeOrigemId === null ||
    $entidadeOrigemId === '' ||
    $entidadeDestinoId === null ||
    $entidadeDestinoId === ''
) {
    http_response_code(400);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'IDs das entidades de origem e destino são obrigatórios.'
    ]);
    exit;
}

if ($entidadeOrigemId === $entidadeDestinoId) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'erro' => 'A entidade de origem deve ser diferente da entidade de destino.'
    ]);
    exit;
}

try {
  $pdo->beginTransaction();

  $stmtEventos = $pdo->prepare("UPDATE eventos SET entidadeId = ? WHERE entidadeId = ?");

  $stmtEventos->execute([$entidadeDestinoId, $entidadeOrigemId]);

  $eventosTransferidos = $stmtEventos->rowCount();

  $stmtParticipantes = $pdo->prepare("UPDATE participantes SET entidadeId = ? WHERE entidadeId = ?");

  $stmtParticipantes->execute([$entidadeDestinoId, $entidadeOrigemId]);

  $pdo->commit();

  echo json_encode(['sucesso' => true]);

} catch (PDOException $e) {

  if ($pdo->inTransaction()) {
      $pdo->rollBack();
  }

  http_response_code(500);

  echo json_encode(['sucesso' => false, 'erro' => 'Erro ao transferir eventos e participantes.']);
}
?>
