var user = document.getElementById("username").value;
var pass = document.getElementById("psw").value;


getAuthentication(user, pass);

function postAuthentication(usuario, senha) {
    
    alert('alerta');

    const dados = {
      username: usuario,
      password: senha
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    };
    
    const url = 'http://127.0.0.1:8000/users/';
    
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
}

window.onclick = function(event) {
    if (event.target == signUp) {
        var user = document.getElementById("username").value;
        var pass = document.getElementById("psw").value;
        console.log(user)
        console.log(pass)
        postAuthentication(usuario, senha)
    }
}
