{function
document.getElementById('loginForm').addEventListener('submit', function(event){})

    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        alert('A senha deve ter pelo menos 8 caracteres.');
        return;
    }
    if (email === 'e-mail@.exemplo.com' && password === 'password123') {
        alert('cadastro bem-sucedido! Bem-vindo(a) à Floricultura Online!');
    } else {
        alert('Email ou senha incorretos. Por favor, tente novamente.');
    }
};

// Array de produtos    
