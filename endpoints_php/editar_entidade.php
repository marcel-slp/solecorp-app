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
$sigla = $_POST['sigla'] ?? null;
$userId = $_POST['userId'] ?? null;
$email = $_POST['email'] ?? null;
$site = $_POST['site'] ?? null;

// Upload da imagem da entidade
$imagemEntidadePath = "uploads/imagens_padrao/default_entidade.jpeg";
if (isset($_FILES['imagemEntidade']) && $_FILES['imagemEntidade']['error'] === UPLOAD_ERR_OK) {
    $ext = pathinfo($_FILES['imagemEntidade']['name'], PATHINFO_EXTENSION);
    $nomeArquivo = uniqid("imagem_entidade_") . "." . strtolower($ext);
    $destino = __DIR__ . "/uploads/" . $nomeArquivo;

    if (!is_dir(__DIR__ . "/uploads")) {
        mkdir(__DIR__ . "/uploads", 0777, true);
    }

    if (move_uploaded_file($_FILES['imagemEntidade']['tmp_name'], $destino)) {
        $imagemEntidadePath = "uploads/" . $nomeArquivo;
    }
} elseif (isset($_POST['imagemEntidade']) && !empty($_POST['imagemEntidade'])) {
    $imagemEntidadePath = $_POST['imagemEntidade'];
}

if (!$id || !$nome || !$sigla || !$userId) {
    http_response_code(400);
    echo json_encode(['erro' => 'Campos obrigatórios não preenchidos.']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE entidades 
        SET nome = ?, sigla = ?, imagemEntidade = ?, email = ?, site = ?, userId = ?
        WHERE id = ?
    ");
    $stmt->execute([
        $nome,
        $sigla,
        $imagemEntidadePath,
        $email,
        $site,
        $userId,
        $id
    ]);

    echo json_encode(['sucesso' => true, 'imagemEntidade' => $imagemEntidadePath]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
