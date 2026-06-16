document.addEventListener("DOMContentLoaded", () => {

    atualizarContador();

    const botoes = document.querySelectorAll(".btn-carrinho");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const produto = {

                id: botao.dataset.id,
                nome: botao.dataset.nome,
                preco: botao.dataset.preco,
                quantidade: 1

            };

            let carrinho =
                JSON.parse(localStorage.getItem("carrinho")) || [];

            const existente = carrinho.find(
                item => item.id === produto.id
            );

            if(existente){

                existente.quantidade++;

            }else{

                carrinho.push(produto);

            }

            localStorage.setItem(
                "carrinho",
                JSON.stringify(carrinho)
            );

            atualizarContador();

        });

    });

});

function atualizarContador(){

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {

        total += item.quantidade;

    });

    document.getElementById("contadorCarrinho").textContent = total;

}