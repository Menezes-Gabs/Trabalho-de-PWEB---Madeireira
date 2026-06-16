$(document).ready(function(){

    let produtos = [];

    carregarProdutos();

    function carregarProdutos(){

        $.getJSON("api/produtos.php", function(dados){

            produtos = dados.filter(
                produto => produto.categoria === "madeira"
            );

            renderizar(produtos);

        });

    }

    function renderizar(lista){

        let html = "";

        lista.forEach(produto => {

            html += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-4">

                    <div class="card produto-card h-100">

                        <img
                            src="assets/img/produtos/${produto.imagem}"
                            class="card-img-top produto-img">

                        <div class="card-body">

                            <h5>${produto.nome}</h5>

                            <p>${produto.descricao}</p>

                            <h4 class="preco">
                                R$ ${produto.preco.toFixed(2)}
                            </h4>

                            <small>
                                Estoque: ${produto.estoque}
                            </small>

                        </div>

                        <div class="card-footer bg-white border-0">

                            <button
                                class="btn btn-warning w-100">
                                Ver Produto
                            </button>

                        </div>

                    </div>

                </div>
            `;

        });

        $("#listaProdutos").html(html);

    }

    $("#pesquisa").on("keyup", function(){

        let busca = $(this).val().toLowerCase();

        let filtrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(busca)
        );

        renderizar(filtrados);

    });

});