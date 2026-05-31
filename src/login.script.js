const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', login);
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return;
    }

    if (email === 'user@example.com' && password === 'password123') {
        alert('Login bem-sucedido! Bem-vindo(a) à Floricultura Online!');
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha incorretos. Por favor, tente novamente.');
    }
}