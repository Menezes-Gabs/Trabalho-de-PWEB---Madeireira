function login()
{
    /*Processo de login*/
    let Usuario = document.getElementById("emailLogin").value
    let Senha = document.getElementById("senhaLogin").value
    let Conf = document.getElementById("confirma_senha").value

    if(Usuario !="admin@gmail.com" && Senha !="123" && confirma_senha != Senha)
    {
        alert("Senha ou Usuario incorreto, tente novamente")
    }
    /*Pagina de admin*/
    else if (Usuario =="admin@gmail.com" && Senha =="123" && Senha == confirma_senha)
    {
        alert("Login bem sucedido")
        window.location.href=("Admin.php")
    }
    /*pagina de cliente*/
    else if (Usuario =="Joaozinho@gmail.com" && Senha =="67" && Senha == confirma_senha)
    {
        alert("Login bem sucedido")
        window.location.href=("Mercadorias.php")
    }
}