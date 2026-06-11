const products = [
    {
        id: 1,
        name: "Rosas Vermelhas",
        description: "Buquê de 12 rosas vermelhas frescas",
        price: "R$ 89,90",
        priceUnitary: "R$ 8,90",
        image: "../Imagens-flores/Rosas vermelhas.jpg"
    },
    {
        id: 2,
        name: "Girassóis Amarelos",
        description: "Arranjo alegre com girassóis naturais",
        price: "R$ 79,90",
        priceUnitary: "R$ 7,90",
        image: "../Imagens-flores/Girassol amarelo.jpg"
    },
    {
        id: 3,
        name: "Orquídeas Roxas",
        description: "Plantas de orquídea roxa em vaso decorativo",
        price: "R$ 129,90",
        priceUnitary: "R$ 12,90",
        image: "../Imagens-flores/orquidea-roxa.jpg"
    },
    {
        id: 4,
        name: "Lírios Brancos",
        description: "Buquê elegante de lírios brancos",
        price: "R$ 99,90",
        priceUnitary: "R$ 9,90",
        image: "../Imagens-flores/Lirios brancos.jpg"
    },
    {
        id: 5,
        name: "Tulipas Coloridas",
        description: "Arranjo variado com tulipas de cores diversas",
        price: "R$ 85,90",
        priceUnitary: "R$ 8,90",
        image: "../Imagens-flores/tulipas coloridas.jpg"
    },
    {
        id: 6,
        name: "Cerejeiras",
        description: "Ramo de cerejeira em flor",
        price: "R$ 110,90",
        priceUnitary: "R$ 10,90",
        image: "../Imagens-flores/flor-de-cerejeira.jpg"
    }
];

// Função para renderizar produtos
function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">Preço buquê: ${product.price}</div>
                <div class="price-unitary">Preço unitário: ${product.priceUnitary}</div>
                <label>Tipo: <select id="type-select-${product.id}">
                    <option value="BUQ">Buquê</option>
                    <option value="UNI">Unidade</option>
                </select></label>
                <button class="btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const select = document.getElementById(`type-select-${product.id}`);
    const type = select ? select.value : 'BUQ';
    const price = type === 'UNI' ? product.priceUnitary : product.price;

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({
        id: product.id,
        nome: product.name,
        tipo: type, // 'BUQ' ou 'UNI'
        preco: price,
        dataAdicao: new Date().toLocaleDateString()
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`✅ ${product.name} (${type === 'UNI' ? 'Unidade' : 'Buquê'}) adicionado ao carrinho!\nPreço: ${price}`);
}

// Função para scroll suave
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Função para submeter formulário de contato
function handleSubmit(event) {
    event.preventDefault();
    alert('✅ Obrigado! Sua mensagem foi enviada com sucesso!\nEntraremos em contato em breve.');
    event.target.reset();
}

// Carregar produtos quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    verificarUsuarioLogado();
});

// Função para verificar se o usuário está logado
function verificarUsuarioLogado() {
    const nomeUsuario = localStorage.getItem('nomeUsuarioLogado');
    const usuarioInfo = document.getElementById('usuarioInfo');
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const loginBtn = document.getElementById('loginBtn');

    if (nomeUsuario) {
        // Usuário está logado - mostrar nome e botão de sair
        nomeUsuarioSpan.textContent = ` ${nomeUsuario}`;
        usuarioInfo.style.display = 'flex';
        loginBtn.style.display = 'none';
    } else {
        // Usuário não está logado - mostrar botão de login
        usuarioInfo.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    }
}

// Função para fazer logout
function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('usuarioLogado');
        localStorage.removeItem('nomeUsuarioLogado');
        alert('Você saiu com sucesso!');
        window.location.href = 'index.html';
    }
}
