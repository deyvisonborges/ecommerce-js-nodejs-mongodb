var inNome = document.getElementById('inNome')
var inSenha = document.getElementById('inSenha')
const btnLogin = document.getElementById('btnLogin')

var nome = inNome.nodeValue
var senha = inSenha.nodeValue

 btnLogin.addEventListener('click', function() {
    if (senha.length <= 6) {
        alert('Senha nao coincide')
        return
    }
 })

