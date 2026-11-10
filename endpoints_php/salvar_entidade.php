<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require 'db.php';

// Verifica se é um POST válido
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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
}

if (!$id || !$nome || !$sigla || !$userId) {
    echo json_encode(['erro' => 'Dados incompletos.']);
    exit;
}

if (strlen($id) > 6) {
    http_response_code(400);
    echo json_encode(["error" => "O campo ID deve ter no maximo 5 caracteres."]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO entidades (id, nome, sigla, email, site, imagemEntidade, userId) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $id,
        $nome,
        $sigla,
        $email,
        $site,
        $imagemEntidadePath,
        $userId
    ]);

    echo json_encode(['sucesso' => true, 'imagemEntidade' => $imagemEntidadePath]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
