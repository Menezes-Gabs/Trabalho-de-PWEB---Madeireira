<?php

$arquivo = "../JSON/Contatos.json";

$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if (!$dadosRecebidos) {
    die("Erro ao receber dados");
}

$contatos = [];

if (file_exists($arquivo)) {
    $contatos = json_decode(file_get_contents($arquivo), true);

    if (!$contatos) {
        $contatos = [];
    }
}

$contatos[] = $dadosRecebidos;

file_put_contents(
    $arquivo,
    json_encode($contatos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

echo json_encode([
    "status" => "sucesso"
]);

?>