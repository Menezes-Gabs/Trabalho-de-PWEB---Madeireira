document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaCarrinho");

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    let subtotal = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div class="alert alert-warning">
                Seu carrinho está vazio.
            </div>
        `;

    } else {

        carrinho.forEach((produto, index) => {

            subtotal += Number(produto.preco);

            lista.innerHTML += `
                <div class="card mb-3">

                    <div class="card-body d-flex justify-content-between align-items-center">

                        <div>
                            <h5>${produto.nome}</h5>
                            <p class="mb-0">
                                R$ ${Number(produto.preco).toFixed(2)}
                            </p>
                        </div>

                        <button
                            class="btn btn-danger"
                            onclick="removerItem(${index})">

                            Remover

                        </button>

                    </div>

                </div>
            `;

        });

    }

    let estado = localStorage.getItem("estado");

    let frete = 30;

    switch (estado) {

        case "SP":
            frete = 10;
            break;

        case "RJ":
            frete = 20;
            break;

        case "MG":
            frete = 15;
            break;

        default:
            frete = 30;
    }

    document.getElementById("subtotal").innerText =
        subtotal.toFixed(2);

    document.getElementById("valorFrete").innerText =
        frete.toFixed(2);

    let subtotalGlobal = subtotal;
    let freteGlobal = frete;

    function calcularTotal() {

        let formaPagamento =
            document.getElementById("pagamento").value;

        let total =
            subtotalGlobal + freteGlobal;

        if (formaPagamento === "pix") {

            total = total * 0.85;

        }

        if (formaPagamento === "credito") {

            total = total * 1.05;

        }

        document.getElementById("total").innerText =
            total.toFixed(2);

    }

    calcularTotal();

    document
        .getElementById("pagamento")
        .addEventListener("change", calcularTotal);

    document
        .getElementById("btnFinalizar")
        .addEventListener("click", finalizarCompra);

});

function removerItem(index) {

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(index, 1);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    location.reload();

}

function finalizarCompra() {

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let formaPagamento =
        document.getElementById("pagamento").value;

    let mensagem = "Compra realizada com sucesso!\n\n";

    if (formaPagamento === "pix") {

        mensagem += "Pagamento via PIX (15% OFF)";

    } else if (formaPagamento === "credito") {

        mensagem += "Pagamento via Cartão de Crédito (+5%)";

    } else {

        mensagem += "Pagamento via Cartão de Débito";

    }

    alert(mensagem);

    localStorage.removeItem("carrinho");

    window.location.href = "Mercadorias.html";

}

//Salvar vendas
document.getElementById("btnFinalizar").addEventListener("click", finalizarCompra);

function finalizarCompra() {

    const usuario = document.getElementById("nomeUsuario").innerText || localStorage.getItem("usuarioLogado");
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
        alert("Carrinho vazio");
        return;
    }

    const subtotal = parseFloat(document.getElementById("subtotal").innerText);
    const frete = parseFloat(document.getElementById("valorFrete").innerText);
    const pagamento = document.getElementById("pagamento").value;

    const total = parseFloat(document.getElementById("total").innerText);

    const venda = {
        usuario: usuario,
        data: new Date().toLocaleString(),
        itens: carrinho,
        subtotal: subtotal,
        frete: frete,
        pagamento: pagamento,
        total: total
    };

    fetch("API/SalvarVenda.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(venda)
    })
    .then(res => res.json())
    .then(res => {

        if (res.status === "ok") {

            localStorage.removeItem("carrinho");

            alert("Compra finalizada!");

            window.location.href = "Mercadorias.html";
        }

    });
}