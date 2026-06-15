function login()
{
    let usuario = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    if(usuario === "admin" && senha === "admin123")
    {
        localStorage.setItem("nomeUsuario", "Administrador");
        window.location.href = "Admin/dashboard.html";
        return;
    }

    if(usuario === "Joao" && senha === "67")
    {
        localStorage.setItem("nomeUsuario", "João");
        window.location.href = "Mercadorias.html";
        return;
    }

    if(usuario === "Maria" && senha === "123")
    {
        localStorage.setItem("nomeUsuario", "Maria");
        window.location.href = "Mercadorias.html";
        return;
    }

    alert("Usuário ou senha inválidos!");
}

window.onload = function()
{
    document.getElementById("nomeUsuario").innerText =
    localStorage.getItem("nomeUsuario");
}

function logout()
{
    let confirmar = confirm("Deseja realmente sair da conta?");

    if(confirmar)
    {
        localStorage.clear();
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", function()
{
    document.getElementById("nomeUsuario").innerText =
    localStorage.getItem("nomeUsuario");
});