document.addEventListener("DOMContentLoaded", carregarCarrinho);

function carregarCarrinho(){

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    let html = "";

    let totalItens = 0;
    let total = 0;

    carrinho.forEach((produto,index)=>{

        let subtotal =
            produto.preco * produto.quantidade;

        totalItens += produto.quantidade;
        total += subtotal;

        html += `

        <div class="card mb-3">

            <div class="card-body">

                <div class="row align-items-center">

                    <div class="col-md-6">

                        <h5>${produto.nome}</h5>

                    </div>

                    <div class="col-md-2">

                        ${produto.quantidade}x

                    </div>

                    <div class="col-md-2">

                        R$ ${Number(produto.preco).toFixed(2)}

                    </div>

                    <div class="col-md-2">

                        <button
                            class="btn btn-danger"
                            onclick="removerProduto(${index})">

                            X

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;
    });

    document.getElementById("itensCarrinho").innerHTML = html;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("valorTotal").textContent =
        "R$ " + total.toFixed(2);
}

function removerProduto(index){

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(index,1);

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    carregarCarrinho();
}