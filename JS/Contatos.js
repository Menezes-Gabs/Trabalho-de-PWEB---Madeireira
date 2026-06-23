document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formContato");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const contato = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            assunto: document.getElementById("assunto").value,
            mensagem: document.getElementById("mensagem").value,
            data: new Date().toLocaleString()
        };

        console.log(contato);

        try {

            const resposta = await fetch("API/SalvarContato.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contato)
            });

            const resultado = await resposta.text();

            console.log(resultado);

            alert("Mensagem enviada!");

            form.reset();

        } catch (erro) {

            console.error(erro);

            alert("Erro ao enviar.");

        }

    });

});