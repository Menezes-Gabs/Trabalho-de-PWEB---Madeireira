<?php

$arquivo = __DIR__ . "/../JSON/vendas.json";

$dados = json_decode(file_get_contents("php://input"), true);

if (!file_exists($arquivo)) {
    file_put_contents($arquivo, "[]");
}

$vendas = json_decode(file_get_contents($arquivo), true);

if (!is_array($vendas)) {
    $vendas = [];
}

$venda = [
    "usuario" => $dados["usuario"],
    "data" => $dados["data"],
    "itens" => $dados["itens"],
    "subtotal" => $dados["subtotal"],
    "frete" => $dados["frete"],
    "pagamento" => $dados["pagamento"],
    "total" => $dados["total"]
];

$vendas[] = $venda;

file_put_contents($arquivo, json_encode($vendas, JSON_PRETTY_PRINT));

echo json_encode(["status" => "ok"]);