// Array de produtos
const products = [
    {
        id: 1,
        name: "Rosas Vermelhas",
        description: "Buquê de 12 rosas vermelhas frescas",
        price: "R$ 89,90",
        Image: ""
    },
    {
        id: 2,
        name: "Girassóis Amarelos",
        description: "Arranjo alegre com girassóis naturais",
        price: "R$ 79,90",
        Image: "🌻"
    },
    {
        id: 3,
        name: "Orquídeas Roxas",
        description: "Plantas de orquídea roxa em vaso decorativo",
        price: "R$ 129,90",
        Image: "💜"
    },
    {
        id: 4,
        name: "Lírios Brancos",
        description: "Buquê elegante de lírios brancos",
        price: "R$ 99,90",
        Image: "⚪"
    },
    {
        id: 5,
        name: "Tulipas Coloridas",
        description: "Arranjo variado com tulipas de cores diversas",
        price: "R$ 85,90",
        Image: "🌷"
    },
    {
        id: 6,
        name: "Cerejeiras",
        description: "Ramo de cerejeira em flor",
        price: "R$ 110,90",
        Image: "🌸"
    }
];

// Função para renderizar produtos
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.Image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price}</div>
                <button class="btn" onclick="addToCart('${product.name}', '${product.price}')">Adicionar ao Carrinho</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Função para adicionar ao carrinho
function addToCart(productName, price) {
    alert(`✅ ${productName} adicionado ao carrinho!\nPreço: ${price}`);
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
document.addEventListener('DOMContentLoaded', loadProducts);