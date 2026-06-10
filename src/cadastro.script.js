const cadastroForm = document.getElementById('cadastroForm');
const fullName = document.getElementById('fullName');
const phone = document.getElementById('phone');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const passwordMatchMessage = document.getElementById('passwordMatchMessage');
const validCodes = ['PROMO100', 'WELCOME', 'FLOR2026'];

if (fullName) {
    fullName.addEventListener('input', function () {
        this.value = this.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'\-]/g, '');
    });
}
function validateName(name) {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,}$/.test(name.trim());
}
function validatePhoneNumber(telefone) {
    return /^\d{10,11}$/.test(telefone);
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateCode(code) {
    if (!code) return true;
    const patternOk = /^[A-Za-z0-9\-]{3,20}$/.test(code);
    const inList = validCodes.length === 0 || validCodes.includes(code);
    return patternOk && inList;
}
if (cadastroForm) {
    cadastroForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nameVal = fullName ? fullName.value : '';
        const phoneVal = phone ? phone.value.replace(/\D/g, '') : '';
        const emailVal = emailField ? emailField.value : '';
        const passwordVal = passwordField ? passwordField.value : '';
        const confirmPasswordVal = confirmPasswordField ? confirmPasswordField.value : '';
        const codeField = document.getElementById('code');
        const codeVal = codeField ? codeField.value.trim() : '';

        if (!validateName(nameVal)) {
            alert('Nome inválido. Use apenas letras e espaço (mínimo 2 caracteres).');
            fullName && fullName.focus();
            return;
        }

        if (!validateEmail(emailVal)) {
            alert('Email inválido. Verifique o formato.');
            emailField && emailField.focus();
            return;
        }

        if (!validatePhoneNumber(phoneVal)) {
            alert('Telefone inválido. Use apenas números (10 ou 11 dígitos).');
            phone && phone.focus();
            return;
        }

        if (!passwordVal || !confirmPasswordVal) {
            alert('Preencha a senha e a confirmação.');
            return;
        }

        if (passwordVal.length < 8) {
            alert('A senha deve ter pelo menos 8 caracteres.');
            passwordField && passwordField.focus();
            return;
        }

        if (passwordVal !== confirmPasswordVal) {
            alert('As senhas não coincidem.');
            return;
        }

        if (!validateCode(codeVal)) {
            alert('Código inválido ou não reconhecido.');
            codeField && codeField.focus();
            return;
        }

        localStorage.setItem(emailVal, passwordVal);
        alert('Cadastro bem-sucedido! Bem-vindo(a) à Floricultura Online!');
        window.location.href = 'login.html';
    });
}

const toggleButtons = document.querySelectorAll('.toggle-password');

function togglePasswordVisibility(event) {
    const targetId = event.currentTarget.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;
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
passwordField && passwordField.addEventListener('input', updatePasswordMatchMessage);
confirmPasswordField && confirmPasswordField.addEventListener('input', updatePasswordMatchMessage);
