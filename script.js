
const WHATSAPP_NUMBER = '923452595926'; 
const BUSINESS_NAME = 'Zarva';


let cart = JSON.parse(localStorage.getItem('zarva_cart')) || [];
let cartItemCounter = 0;

console.log('🛒 Zarva Cart JavaScript loaded successfully!');

function filterProducts(category) {
    console.log('🔄 Filtering products by category:', category);
    
    const productCards = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-section .btn');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
   
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', '');
    });
    
    
    if (category === 'all') {
        if (filterButtons[0]) {
            filterButtons[0].classList.add('active');
            filterButtons[0].setAttribute('aria-pressed', 'true');
        }
        if (navLinks[0]) {
            navLinks[0].classList.add('active');
            navLinks[0].setAttribute('aria-current', 'page');
        }
    } else {
        const categoryIndex = { men: 1, women: 2, kids: 3 };
        if (filterButtons[categoryIndex[category]]) {
            filterButtons[categoryIndex[category]].classList.add('active');
            filterButtons[categoryIndex[category]].setAttribute('aria-pressed', 'true');
        }
        if (navLinks[categoryIndex[category]]) {
            navLinks[categoryIndex[category]].classList.add('active');
            navLinks[categoryIndex[category]].setAttribute('aria-current', 'page');
        }
    }
    
    
    let visibleCount = 0;
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            card.classList.add('visible');
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 100);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.remove('visible');
                card.classList.add('hidden');
            }, 300);
        }
    });
    
    console.log(`✅ Filter completed: Showing ${visibleCount} products for category: ${category}`);
    showNotification(`Showing ${visibleCount} products in ${category} category`, 'info');
}



function orderSingleOnWhatsApp(productName, price, productId) {
    console.log('📱 WhatsApp order initiated for:', productName);
    
    
    const sizeSelect = document.getElementById(`size-${productId}`);
    const qtySelect = document.getElementById(`qty-${productId}`);
    const citySelector = document.getElementById('citySelector');
    
    if (!sizeSelect || !qtySelect) {
        showNotification('Error: Size or quantity selector not found for ' + productId, 'error');
        return;
    }
    
    const selectedSize = sizeSelect.value;
    const selectedQuantity = parseInt(qtySelect.value);
    const selectedCity = citySelector.value || 'Not specified';
    
    const totalPrice = price * selectedQuantity;
    
    const message = `Hello ${BUSINESS_NAME}, I want to order:

📦 *Product:* ${productName}
📏 *Size:* ${selectedSize}
🔢 *Quantity:* ${selectedQuantity}
💰 *Price:* PKR ${totalPrice.toLocaleString()}
📍 *City:* ${selectedCity}

Please confirm availability and delivery details. Thank you!`;

    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp URL:', whatsappURL);
    window.open(whatsappURL, '_blank');
    
    showNotification('Opening WhatsApp to complete your order...', 'success');
}

function orderAllOnWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! Add products first.', 'warning');
        return;
    }
    
    const citySelector = document.getElementById('citySelector');
    const selectedCity = citySelector.value || 'Not specified';
    
    let message = `Hello ${BUSINESS_NAME}, I have ${cart.length} items in my cart. Please check & confirm:\n\n`;
    
    cart.forEach((item, index) => {
        message += `${index + 1}) ${item.name} — Size: ${item.size} — Qty: ${item.quantity} — PKR ${item.totalPrice.toLocaleString()}\n`;
    });
    
    message += `\n*Shipping (City: ${selectedCity})*\n\n`;
    
   
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    message += `*Total Amount: PKR ${total.toLocaleString()}*\n\n`;
    message += `Please confirm availability and delivery details. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp with bulk order:', whatsappURL);
    window.open(whatsappURL, '_blank');
    
    showNotification(`Opening WhatsApp with ${cart.length} items for order...`, 'success');
}


function addToCart(productId, productName, price) {
    console.log(`➕ Adding to cart: ${productName} (ID: ${productId}, Price: ${price})`);
    
    const sizeSelect = document.getElementById(`size-${productId}`);
    const qtySelect = document.getElementById(`qty-${productId}`);
    
    if (!sizeSelect || !qtySelect) {
        showNotification('Error: Size or quantity selector not found', 'error');
        return;
    }
    
    const selectedSize = sizeSelect.value;
    const selectedQuantity = parseInt(qtySelect.value);

    const cartItem = {
        id: `cart_${Date.now()}_${cartItemCounter++}`,
        productId: productId,
        name: productName,
        size: selectedSize,
        quantity: selectedQuantity,
        unitPrice: price,
        totalPrice: price * selectedQuantity,
        timestamp: new Date().toISOString()
    };

    cart.push(cartItem);
 
    localStorage.setItem('zarva_cart', JSON.stringify(cart));
    
    updateCartDisplay();
  
    showNotification(`Added ${productName} (${selectedSize}, Qty: ${selectedQuantity}) to cart!`, 'success');
    
    console.log('✅ Product added to cart:', cartItem);
}

function removeFromCart(cartItemId) {
    console.log('🗑️ Removing item from cart:', cartItemId);
    
    cart = cart.filter(item => item.id !== cartItemId);
    localStorage.setItem('zarva_cart', JSON.stringify(cart));
    updateCartDisplay();
    
    showNotification('Item removed from cart', 'info');
}

function updateCartQuantity(cartItemId, newQuantity) {
    console.log('📊 Updating cart quantity:', cartItemId, newQuantity);
    
    const item = cart.find(item => item.id === cartItemId);
    if (item) {
        item.quantity = newQuantity;
        item.totalPrice = item.unitPrice * newQuantity;
        
        localStorage.setItem('zarva_cart', JSON.stringify(cart));
        updateCartDisplay();
        
        showNotification('Cart updated', 'info');
    }
}

function updateCartDisplay() {
    console.log('🛒 Updating cart display...');
    
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalItems = document.getElementById('cart-total-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const bulkOrderBtn = document.getElementById('bulkOrderBtn');
    const emptyCart = document.getElementById('emptyCart');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Update totals
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    if (cartTotalItems) cartTotalItems.textContent = cart.length;
    if (cartTotalPrice) cartTotalPrice.textContent = `PKR ${totalPrice.toLocaleString()}`;
    
    // Enable/disable bulk order button
    if (bulkOrderBtn) {
        bulkOrderBtn.disabled = cart.length === 0;
    }
    
    // Update cart items list
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center text-muted p-3">
                    <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                    <p>Your cart is empty</p>
                    <small>Add products to your cart to start shopping</small>
                </div>
            `;
        } else {
            let cartItemsHTML = '';
            cart.forEach(item => {
                cartItemsHTML += `
                    <div class="cart-item mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="cart-item-details flex-grow-1">
                                <h6 class="mb-1">${item.name}</h6>
                                <small class="text-muted">Size: ${item.size}</small>
                                <br>
                                <small class="text-muted">Unit Price: PKR ${item.unitPrice.toLocaleString()}</small>
                                <div class="cart-item-controls mt-2">
                                    <div class="d-flex align-items-center">
                                        <label class="form-label me-2 mb-0">Qty:</label>
                                        <select class="form-select form-select-sm" style="width: 80px;" 
                                                onchange="updateCartQuantity('${item.id}', parseInt(this.value))">
                                            ${Array.from({length: 10}, (_, i) => 
                                                `<option value="${i + 1}" ${item.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="cart-item-actions text-end ms-2">
                                <div class="mb-2">
                                    <strong>PKR ${item.totalPrice.toLocaleString()}</strong>
                                </div>
                                <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartItemsContainer.innerHTML = cartItemsHTML;
        }
    }
}

// =======================
// CART SIDEBAR TOGGLE
// =======================

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (!cartSidebar || !cartOverlay) {
        console.warn('Cart sidebar or overlay not found');
        return;
    }
    
    const isVisible = cartSidebar.classList.contains('show');
    
    if (isVisible) {
        cartSidebar.classList.remove('show');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
        console.log('Cart sidebar closed');
    } else {
        cartSidebar.classList.add('show');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('Cart sidebar opened');
    }
}

// =======================
// CITY SELECTOR
// =======================

function saveCity() {
    const citySelector = document.getElementById('citySelector');
    if (citySelector) {
        const selectedCity = citySelector.value;
        localStorage.setItem('zarva_selected_city', selectedCity);
        if (selectedCity) {
            showNotification(`City saved: ${selectedCity}`, 'success');
        }
        console.log('City saved:', selectedCity);
    }
}

// =======================
// UTILITY FUNCTIONS
// =======================

function showNotification(message, type = 'info') {
    console.log('🔔 Notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// =======================
// INITIALIZATION
// =======================

function initializeWebsite() {
    console.log('🚀 Initializing Zarva website...');
    
    // Load saved city
    const savedCity = localStorage.getItem('zarva_selected_city');
    const citySelector = document.getElementById('citySelector');
    if (citySelector && savedCity) {
        citySelector.value = savedCity;
    }
    
    // Initialize cart display
    updateCartDisplay();
    
    // Set initial filter - show all products
    filterProducts('all');
    
    // Initialize mobile menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow on scroll
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    console.log('✅ Zarva website initialization completed!');
}

// =======================
// GLOBAL EVENT LISTENERS
// =======================

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
    }
});

// Handle network status
window.addEventListener('offline', function() {
    showNotification('You are offline. Some features may not work properly.', 'warning');
});

window.addEventListener('online', function() {
    showNotification('Connection restored!', 'success');
});

// =======================
// GLOBAL FUNCTION EXPORTS
// =======================

// Make all functions globally accessible
window.filterProducts = filterProducts;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.orderSingleOnWhatsApp = orderSingleOnWhatsApp;
window.orderAllOnWhatsApp = orderAllOnWhatsApp;
window.toggleCart = toggleCart;
window.saveCity = saveCity;
window.showNotification = showNotification;

// =======================
// DOM READY INITIALIZATION
// =======================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Show welcome message
setTimeout(() => {
    showNotification('Welcome to Zarva! Browse products, add to cart, and order via WhatsApp.', 'success');
}, 2000);

console.log('🎉 All Zarva functions are now globally available and ready to use!');