// Objeto para armazenar produtos com quantidade
let cart = {};
const SHIPPING_COST = 10;

// Função para extrair número do preço
function parsePrice(priceString) {
    return parseFloat(priceString.replace('R$', '').replace(',', '.').trim());
}

// Função para formatar preço
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Função para carregar e organizar o carrinho
function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Organizar produtos por nome, agrupando quantidades
    // Agora agrupamos pelo nome + tipo para diferenciar buquê vs unidade
    cart = {};
    cartData.forEach(item => {
        const type = item.tipo || 'BUQ';
        const key = `${item.nome}___${type}`;
        if (cart[key]) {
            cart[key].quantity += 1;
        } else {
            cart[key] = {
                id: item.id || null,
                name: item.nome,
                type: type,
                price: parsePrice(item.preco),
                quantity: 1,
                originalPrice: item.preco
            };
        }
    });
}

// Função para renderizar o carrinho
function renderCart() {
    loadCart();
    
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTable = document.querySelector('.cart-table-wrapper');
    
    cartItemsContainer.innerHTML = '';
    
    const items = Object.keys(cart);
    
    if (items.length === 0) {
        cartTable.style.display = 'none';
        emptyCart.style.display = 'block';
        document.querySelector('.cart-summary').style.display = 'none';
    } else {
        cartTable.style.display = 'block';
        emptyCart.style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'block';
        
        items.forEach(key => {
            const item = cart[key];
            const itemTotal = item.price * item.quantity;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.type === 'UNI' ? 'Unidade' : 'Buquê'}</td>
                <td>${formatPrice(item.price)}</td>
                <td>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${key}')">−</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${key}', this.value)">
                        <button onclick="increaseQuantity('${key}')">+</button>
                    </div>
                </td>
                <td>${formatPrice(itemTotal)}</td>
                <td><button class="remove-btn" onclick="removeFromCart('${key}')">Remover</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
    
    updateTotals();
}

// Função para aumentar quantidade
function increaseQuantity(productKey) {
    if (cart[productKey]) {
        cart[productKey].quantity += 1;
        updateLocalStorage();
        renderCart();
    }
}

// Função para diminuir quantidade
function decreaseQuantity(productKey) {
    if (cart[productKey] && cart[productKey].quantity > 1) {
        cart[productKey].quantity -= 1;
        updateLocalStorage();
        renderCart();
    }
}

// Função para atualizar quantidade manualmente
function updateQuantity(productKey, newQuantity) {
    newQuantity = parseInt(newQuantity) || 1;
    if (newQuantity < 1) newQuantity = 1;
    
    if (cart[productKey]) {
        cart[productKey].quantity = newQuantity;
        updateLocalStorage();
        renderCart();
    }
}

// Função para remover produto do carrinho
function removeFromCart(productKey) {
    const item = cart[productKey];
    const displayName = item ? `${item.name} ${item.type === 'UNI' ? '(Unidade)' : '(Buquê)'}` : productKey;
    if (confirm(`Deseja remover ${displayName} do carrinho?`)) {
        delete cart[productKey];
        updateLocalStorage();
        renderCart();
        alert('Produto removido do carrinho!');
    }
}

// Função para atualizar localStorage
function updateLocalStorage() {
    const cartArray = [];
    Object.keys(cart).forEach(key => {
        const item = cart[key];
        for (let i = 0; i < item.quantity; i++) {
            cartArray.push({
                id: item.id || null,
                nome: item.name,
                tipo: item.type,
                preco: item.originalPrice || formatPrice(item.price),
                dataAdicao: new Date().toLocaleDateString()
            });
        }
    });
    localStorage.setItem('carrinho', JSON.stringify(cartArray));
}

// Função para calcular e atualizar totais
function updateTotals() {
    let subtotal = 0;
    
    Object.keys(cart).forEach(productName => {
        const item = cart[productName];
        subtotal += item.price * item.quantity;
    });
    
    const shipping = Object.keys(cart).length > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = Object.keys(cart).length > 0 ? formatPrice(shipping) : 'R$ 0,00';
    document.getElementById('total').textContent = formatPrice(total);
}

// Função para limpar carrinho
function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('carrinho');
        cart = {};
        renderCart();
        alert('Carrinho limpo com sucesso!');
    }
}

// Função para finalizar compra
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (Object.keys(cart).length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            alert('✅ Pedido finalizado com sucesso!\n\nObrigado pela sua compra na Beleza & Flores! 🌸\n\nSeu pedido será entregue em breve.');
            localStorage.removeItem('carrinho');
            cart = {};
            renderCart();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});
