fetch("JSON/vendas.json")
.then(res => res.json())
.then(vendas => {

    const container = document.getElementById("listaVendas");
    container.innerHTML = "";

    if (!Array.isArray(vendas) || vendas.length === 0) {
        container.innerHTML = "<p>Nenhuma compra encontrada.</p>";
        return;
    }

    vendas.reverse().forEach(v => {

        let itensHtml = "";

        if (Array.isArray(v.itens)) {
            v.itens.forEach(i => {
                itensHtml += `
                    <div>
                        ${i.nome} - ${i.qtd}x - R$ ${i.preco}
                    </div>
                `;
            });
        }

        const div = document.createElement("div");

        div.innerHTML = `
            <h4>${v.usuario}</h4>
            <small>${v.data}</small>
            <hr>
            ${itensHtml}
            <p><strong>Total: R$ ${v.total}</strong></p>
        `;

        container.appendChild(div);
    });

})
.catch(err => {
    console.log(err);
});