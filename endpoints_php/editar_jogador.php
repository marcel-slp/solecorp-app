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
$posicao = $_POST['posicao'] ?? null;
$selecao = $_POST['selecao'] ?? null;
$listaMelhorJogador = filter_var($_POST['listaMelhorJogador'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$listaMelhorGoleiro = filter_var($_POST['listaMelhorGoleiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$listaArtilheiro = filter_var($_POST['listaArtilheiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$melhorJogador = filter_var($_POST['melhorJogador'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$melhorGoleiro = filter_var($_POST['melhorGoleiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$artilheiro = filter_var($_POST['artilheiro'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

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

$imagemJogadorPath = processarUpload('imagemJogador', 'imagem_jogador_', 'uploads/imagens_padrao/default_jogador.jpg', $_POST['imagemJogador'] ?? null);

if (!isset($_POST['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatorios nao preenchidos.']);
    exit;
}

if (strlen($id) > 6) {
    http_response_code(400);
    echo json_encode(['error' => 'O campo ID deve ter no máximo 5 caracteres.']);
    exit;
}


try {
    $stmt = $pdo->prepare(
        "UPDATE bolao_jogadores
         SET 
            nome = ?, 
            posicao = ?, 
            selecao = ?, 
            imagemJogador = ?,
            listaMelhorJogador = ?, 
            listaMelhorGoleiro = ?, 
            listaArtilheiro = ?, 
            melhorJogador = ?, 
            melhorGoleiro = ?, 
            artilheiro = ?
         WHERE id = ?"
    );

    $stmt->execute([
        $nome,
        $posicao,
        $selecao,
        $imagemJogadorPath,
        $listaMelhorJogador,
        $listaMelhorGoleiro,
        $listaArtilheiro,
        $melhorJogador,
        $melhorGoleiro,
        $artilheiro,
        $id
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