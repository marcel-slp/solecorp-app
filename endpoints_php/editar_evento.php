<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'db.php';

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? null;
$modalidade = $_POST['modalidade'] ?? null;
$tabela = $_POST['tabela'] ?? null;
$playoff = $_POST['playoff'] ?? null;
$compartilhamento = $_POST['compartilhamento'] ?? null;
$numeroFases = isset($_POST['numeroFases']) ? (int)$_POST['numeroFases'] : null;
$formaSistema = $_POST['formaSistema'] ?? null;
$numeroParticipantes = isset($_POST['numeroParticipantes']) ? (int)$_POST['numeroParticipantes'] : null;
$configuracaoFases = isset($_POST['configuracaoFases']) ? json_decode($_POST['configuracaoFases'], true) : null;
$configuracaoEvento = isset($_POST['configuracaoEvento']) ? json_decode($_POST['configuracaoEvento'], true) : null;
$participantes = isset($_POST['participantes']) ? json_decode($_POST['participantes'], true) : null;

function processarUpload($campo, $prefixo, $defaultPath, $pathExistente) {
    if (isset($_FILES[$campo]) && $_FILES[$campo]['error'] === UPLOAD_ERR_OK) {
        $ext = pathinfo($_FILES[$campo]['name'], PATHINFO_EXTENSION);
        $nomeArquivo = uniqid($prefixo) . "." . strtolower($ext);
        $destino = __DIR__ . "/uploads/" . $nomeArquivo;

        if (!is_dir(__DIR__ . "/uploads")) {
            mkdir(__DIR__ . "/uploads", 0777, true);
        }

        if (move_uploaded_file($_FILES[$campo]['tmp_name'], $destino)) {
            return "uploads/" . $nomeArquivo;
        }
    }
    return $pathExistente && !empty($pathExistente) ? $pathExistente : $defaultPath;
}

$imagemEventoPath = processarUpload('imagemEvento', 'imagem_evento_', 'uploads/imagens_padrao/default_evento.jpg', $_POST['imagemEvento'] ?? null);
$imagemPatrocinador1Path = processarUpload('imagemPatrocinador1', 'imagem_patrocinador1_', 'uploads/imagens_padrao/default_patrocinador1.jpg', $_POST['imagemPatrocinador1'] ?? null);
$imagemPatrocinador2Path = processarUpload('imagemPatrocinador2', 'imagem_patrocinador2_', 'uploads/imagens_padrao/default_patrocinador2.jpg', $_POST['imagemPatrocinador2'] ?? null);
$imagemPatrocinador3Path = processarUpload('imagemPatrocinador3', 'imagem_patrocinador3_', 'uploads/imagens_padrao/default_patrocinador3.jpg', $_POST['imagemPatrocinador3'] ?? null);
$imagemPatrocinador4Path = processarUpload('imagemPatrocinador4', 'imagem_patrocinador4_', 'uploads/imagens_padrao/default_patrocinador4.jpg', $_POST['imagemPatrocinador4'] ?? null);

if (!$id || !$nome || !$modalidade || !$tabela || !$playoff || !$compartilhamento || $numeroFases === null || !$formaSistema || $numeroParticipantes === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatórios não preenchidos.']);
    exit;
}

if (strlen($id) > 6) {
    http_response_code(400);
    echo json_encode(['error' => 'O campo ID deve ter no máximo 5 caracteres.']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "UPDATE eventos 
         SET nome = ?, modalidade = ?, tabela = ?, playoff = ?, compartilhamento = ?, 
             numeroFases = ?, formaSistema = ?, numeroParticipantes = ?, configuracaoFases = ?, 
             configuracaoEvento = ?, participantes = ?, imagemEvento = ?, 
             imagemPatrocinador1 = ?, imagemPatrocinador2 = ?, imagemPatrocinador3 = ?, 
             imagemPatrocinador4 = ?
         WHERE id = ?"
    );
    $stmt->execute([
        $nome,
        $modalidade,
        $tabela,
        $playoff,
        $compartilhamento,
        $numeroFases,
        $formaSistema,
        $numeroParticipantes,
        $configuracaoFases ? json_encode($configuracaoFases, JSON_UNESCAPED_UNICODE) : null,
        $configuracaoEvento ? json_encode($configuracaoEvento, JSON_UNESCAPED_UNICODE) : null,
        $participantes ? json_encode($participantes, JSON_UNESCAPED_UNICODE) : null,
        $imagemEventoPath,
        $imagemPatrocinador1Path,
        $imagemPatrocinador2Path,
        $imagemPatrocinador3Path,
        $imagemPatrocinador4Path,
        $id
    ]);

    echo json_encode([
        'success' => true,
        'data' => [
            'imagemEvento' => $imagemEventoPath,
            'imagemPatrocinador1' => $imagemPatrocinador1Path,
            'imagemPatrocinador2' => $imagemPatrocinador2Path,
            'imagemPatrocinador3' => $imagemPatrocinador3Path,
            'imagemPatrocinador4' => $imagemPatrocinador4Path
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>