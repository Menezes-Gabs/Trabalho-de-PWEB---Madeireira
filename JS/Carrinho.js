document.querySelectorAll(".btn-carrinho").forEach(botao => {

    botao.addEventListener("click", () => {

        const produto = {

            id: botao.dataset.id,
            nome: botao.dataset.nome,
            preco: parseFloat(botao.dataset.preco)
        };

        let carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        carrinho.push(produto);

        localStorage.setItem(
            "carrinho",
            JSON.stringify(carrinho)
        );

        atualizarContador();

        alert("Produto adicionado ao carrinho!");
    });

});

function atualizarContador() {

    const carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    const contador =
        document.getElementById("contadorCarrinho");

    if (contador) {
        contador.textContent = carrinho.length;
    }
}

atualizarContador();