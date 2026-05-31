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

const toggleButtons = document.querySelectorAll('.toggle-password');
const passwordMatchMessage = document.getElementById('passwordMatchMessage');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');

function togglePasswordVisibility(event) {
    const targetId = event.currentTarget.getAttribute('data-target');
    const input = document.getElementById(targetId);
    input.type = input.type === 'password' ? 'text' : 'password';
    event.currentTarget.textContent = input.type === 'password' ? '👁️' : '🙈';
}

function updatePasswordMatchMessage() {
    if (!passwordField.value && !confirmPasswordField.value) {
        passwordMatchMessage.textContent = '';
        passwordMatchMessage.className = 'match-message';
        return;
    }

    if (passwordField.value === confirmPasswordField.value) {
        passwordMatchMessage.textContent = 'As senhas coincidem.';
        passwordMatchMessage.className = 'match-message match-ok';
    } else {
        passwordMatchMessage.textContent = 'As senhas não coincidem.';
        passwordMatchMessage.className = 'match-message match-error';
    }
}

toggleButtons.forEach(button => button.addEventListener('click', togglePasswordVisibility));
passwordField.addEventListener('input', updatePasswordMatchMessage);
confirmPasswordField.addEventListener('input', updatePasswordMatchMessage);
