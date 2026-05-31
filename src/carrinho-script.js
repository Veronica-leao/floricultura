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
    cart = {};
    cartData.forEach(item => {
        if (cart[item.nome]) {
            cart[item.nome].quantity += 1;
        } else {
            cart[item.nome] = {
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
        
        items.forEach(productName => {
            const item = cart[productName];
            const itemTotal = item.price * item.quantity;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${productName}</strong></td>
                <td>${formatPrice(item.price)}</td>
                <td>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity('${productName}')">−</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${productName}', this.value)">
                        <button onclick="increaseQuantity('${productName}')">+</button>
                    </div>
                </td>
                <td>${formatPrice(itemTotal)}</td>
                <td><button class="remove-btn" onclick="removeFromCart('${productName}')">Remover</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }
    
    updateTotals();
}

// Função para aumentar quantidade
function increaseQuantity(productName) {
    if (cart[productName]) {
        cart[productName].quantity += 1;
        updateLocalStorage();
        renderCart();
    }
}

// Função para diminuir quantidade
function decreaseQuantity(productName) {
    if (cart[productName] && cart[productName].quantity > 1) {
        cart[productName].quantity -= 1;
        updateLocalStorage();
        renderCart();
    }
}

// Função para atualizar quantidade manualmente
function updateQuantity(productName, newQuantity) {
    newQuantity = parseInt(newQuantity) || 1;
    if (newQuantity < 1) newQuantity = 1;
    
    if (cart[productName]) {
        cart[productName].quantity = newQuantity;
        updateLocalStorage();
        renderCart();
    }
}

// Função para remover produto do carrinho
function removeFromCart(productName) {
    if (confirm(`Deseja remover ${productName} do carrinho?`)) {
        delete cart[productName];
        updateLocalStorage();
        renderCart();
        alert('Produto removido do carrinho!');
    }
}

// Função para atualizar localStorage
function updateLocalStorage() {
    const cartArray = [];
    Object.keys(cart).forEach(productName => {
        const item = cart[productName];
        for (let i = 0; i < item.quantity; i++) {
            cartArray.push({
                nome: productName,
                preco: item.originalPrice,
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
