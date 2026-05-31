const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', cadastro);
}

function cadastro(event) {
    event.preventDefault();
    const telefone = document.getElementById('phone').value;
    const apenasNumeros = /^\d{10,11}$/.test(telefone);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    alert('Cadastro bem-sucedido! Bem-vindo(a) à Floricultura Online!');
    window.location.href = 'index.html';
}
