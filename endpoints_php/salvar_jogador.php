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
$listaMelhorJogador = filter_var($_POST['listaMelhorJogador'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$listaMelhorGoleiro = filter_var($_POST['listaMelhorGoleiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$listaArtilheiro = filter_var($_POST['listaArtilheiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$melhorJogador = 0;
$melhorGoleiro = 0;
$artilheiro = 0;

$campeonatoId = 1;

function processarUpload($campo, $prefixo, $defaultPath) {
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
    return $defaultPath;
}

$imagemJogadorPath = processarUpload('imagemJogador', 'imagem_jogador_', 'uploads/imagens_padrao/default_jogador.jpg');

if (!isset($_POST['id']) ||
    !isset($_POST['nome']) || 
    !isset($_POST['posicao']) || 
    !isset($_POST['selecao'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados incompletos.']);
    exit;
}

if (strlen($id) > 6) {
    http_response_code(400);
    echo json_encode(['error' => 'O campo ID deve ter no máximo 5 caracteres.']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO bolao_jogadores (
            id, nome, campeonatoId, imagemJogador, posicao,
            selecao, listaMelhorJogador, listaMelhorGoleiro,
            listaArtilheiro, melhorJogador, melhorGoleiro, artilheiro
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $id,
        $nome,
        $campeonatoId,
        $imagemJogadorPath,
        $posicao,
        $selecao,
        $listaMelhorJogador,
        $listaMelhorGoleiro,
        $listaArtilheiro,
        $melhorJogador,
        $melhorGoleiro,
        $artilheiro
    ]);

    echo json_encode([
        'success' => true,
        'data' => [
            'imagemJogador' => $imagemJogadorPath
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>