document.addEventListener("DOMContentLoaded", function () {

    const cidade = localStorage.getItem("cidade");
    const estado = localStorage.getItem("estado");

    if (cidade && estado) {

        document.getElementById("localizacao").innerHTML =
            `<i class="bi bi-geo-alt-fill"></i> ${cidade} - ${estado}`;
    }

    document.getElementById("btnCep").addEventListener("click", function () {

        let cep = document.getElementById("cep").value.trim();

        cep = cep.replace(/\D/g, "");

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(dados => {

                if (dados.erro) {
                    alert("CEP não encontrado!");
                    return;
                }

                let frete = 30;

                switch (dados.uf) {

                    case "SP":
                        frete = 10;
                        break;

                    case "RJ":
                        frete = 15;
                        break;

                    case "MG":
                        frete = 18;
                        break;

                    case "PR":
                        frete = 20;
                        break;
                }

                localStorage.setItem("cidade", dados.localidade);
                localStorage.setItem("estado", dados.uf);
                localStorage.setItem("frete", frete);

                document.getElementById("localizacao").innerHTML =
                    `<i class="bi bi-geo-alt-fill"></i> ${dados.localidade} - ${dados.uf}`;

                alert(`Frete definido: R$ ${frete}`);
            });
    });
});