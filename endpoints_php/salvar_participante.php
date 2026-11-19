<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? null;
$entidadeId = $_POST['entidadeId'] ?? null;
$tipo = $_POST['tipo'] ?? null;
$grupo = $_POST['grupo'] ?? null;
$atletas = isset($_POST['atletas']) ? json_decode($_POST['atletas'], true) : null;

// Upload da imagem do participante
$imagemParticipantePath = "uploads/imagens_padrao/default_participante.jpeg";
if (isset($_FILES['imagemParticipante']) && $_FILES['imagemParticipante']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['imagemParticipante']['name'], PATHINFO_EXTENSION);
    $nomeArquivo = uniqid("imagem_participante_") . "." . strtolower($ext);
    $destino = __DIR__ . "/uploads/" . $nomeArquivo;

    if (!is_dir(__DIR__ . "/uploads")) {
        mkdir(__DIR__ . "/uploads", 0777, true);
    }

    if (move_uploaded_file($_FILES['imagemParticipante']['tmp_name'], $destino)) {
        $imagemParticipantePath = "uploads/" . $nomeArquivo;
    }
}

// Upload da imagem dos atletas
$imagemAtletasPath = "uploads/imagens_padrao/default_atleta.jpeg";
if (isset($_FILES['imagemAtletas']) && $_FILES['imagemAtletas']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['imagemAtletas']['name'], PATHINFO_EXTENSION);
    $nomeArquivo = uniqid("imagem_atletas_") . "." . strtolower($ext);
    $destino = __DIR__ . "/uploads/" . $nomeArquivo;

    if (!is_dir(__DIR__ . "/uploads")) {
        mkdir(__DIR__ . "/uploads", 0777, true);
    }

    if (move_uploaded_file($_FILES['imagemAtletas']['tmp_name'], $destino)) {
        $imagemAtletasPath = "uploads/" . $nomeArquivo;
    }
}

if (!$nome || !$tipo || !$grupo || !$id || !$entidadeId) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

if (strlen($id) > 6) {
    http_response_code(400);
    echo json_encode(["error" => "O campo ID deve ter no maximo 5 caracteres."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO participantes (id, nome, entidadeId, tipo, grupo, atletas, imagemParticipante, imagemAtletas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $id,
        $nome,
        $entidadeId,
        $tipo,
        $grupo,
        $atletas ? json_encode($atletas, JSON_UNESCAPED_UNICODE) : null,
        $imagemParticipantePath,
        $imagemAtletasPath
    ]);

    echo json_encode(['sucesso' => true, 'imagemParticipante' => $imagemParticipantePath, 'imagemAtletas' => $imagemAtletasPath]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
