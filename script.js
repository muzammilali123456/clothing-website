// Product data
const products = [
    {
        id: 0,
        name: "Classic White Shirt",
        description: "Premium cotton blend, perfect for formal occasions and everyday wear",
        price: "PKR 2,500",
        priceNumber: 2500,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop"
    },
    {
        id: 1,
        name: "Denim Jacket",
        description: "Classic fit denim jacket with vintage wash finish",
        price: "PKR 4,200",
        priceNumber: 4200,
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Black Trousers",
        description: "Slim fit formal trousers in premium polyester blend",
        price: "PKR 3,800",
        priceNumber: 3800,
        image: "https://images.unsplash.com/photo-1578587018452-8927c328b87d?w=400&h=600&fit=crop"
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        description: "Soft cotton t-shirt with modern fit design",
        price: "PKR 1,800",
        priceNumber: 1800,
        image: "https://images.unsplash.com/photo-1592878967665-1f8f32b1c4c8?w=400&h=600&fit=crop"
    },
    {
        id: 4,
        name: "Blue Blazer",
        description: "Professional blazer in navy blue with modern cut",
        price: "PKR 7,500",
        priceNumber: 7500,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop"
    },
    {
        id: 5,
        name: "Wool Sweater",
        description: "Warm wool sweater for winter comfort and style",
        price: "PKR 4,800",
        priceNumber: 4800,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400&h=600&fit=crop"
    },
    {
        id: 6,
        name: "Checkered Shirt",
        description: "Classic checkered pattern shirt in soft cotton",
        price: "PKR 3,200",
        priceNumber: 3200,
        image: "https://images.unsplash.com/photo-1566479179817-c62c24b9c2a1?w=400&h=600&fit=crop"
    },
    {
        id: 7,
        name: "Khaki Chinos",
        description: "Comfortable cotton chinos with slim fit design",
        price: "PKR 3,500",
        priceNumber: 3500,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f31c9?w=400&h=600&fit=crop"
    }
];

// Global variables
let selectedCity = localStorage.getItem('selectedCity') || '';
let selectedSize = null;
let currentProduct = null;

// DOM elements
const citySelector = document.getElementById('citySelector');
const mainStore = document.getElementById('mainStore');
const selectedCityDisplay = document.getElementById('selectedCityDisplay');
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if city is already selected
    if (selectedCity) {
        showMainStore();
    }
    
    // Initialize city selection
    initializeCitySelection();
    
    // Initialize product cards
    initializeProductCards();
    
    // Initialize modal
    initializeModal();
    
    // Initialize size selection
    initializeSizeSelection();
}

function initializeCitySelection() {
    const cityOptions = document.querySelectorAll('.city-option');
    
    cityOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedCity = this.dataset.city;
            localStorage.setItem('selectedCity', selectedCity);
            showMainStore();
        });
    });
}

function showMainStore() {
    // Update city display
    selectedCityDisplay.textContent = selectedCity;
    
    // Fade out city selector
    citySelector.style.opacity = '0';
    
    // Show main store
    setTimeout(() => {
        citySelector.style.display = 'none';
        mainStore.style.opacity = '1';
        mainStore.style.pointerEvents = 'auto';
        mainStore.classList.add('fade-in');
    }, 400);
}

function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = parseInt(this.dataset.product);
            openProductModal(productId);
        });
    });
}

function openProductModal(productId) {
    currentProduct = products[productId];
    
    // Update modal content
    document.getElementById('modalProductImage').src = currentProduct.image;
    document.getElementById('modalProductImage').alt = currentProduct.name;
    document.getElementById('modalProductTitle').textContent = currentProduct.name;
    document.getElementById('modalProductDescription').textContent = currentProduct.description;
    document.getElementById('modalProductPrice').textContent = currentProduct.price;
    
    // Reset size selection
    selectedSize = null;
    updateSizeSelection();
    
    // Show modal
    productModal.style.display = 'flex';
    setTimeout(() => {
        productModal.style.opacity = '1';
        document.querySelector('.modal-container').style.transform = 'scale(1)';
    }, 10);
    
    // Add animation class
    document.querySelector('.modal-container').classList.add('fade-in');
}

function initializeModal() {
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Place order button
    placeOrderBtn.addEventListener('click', placeOrder);
}

function closeModal() {
    // Fade out modal
    productModal.style.opacity = '0';
    document.querySelector('.modal-container').style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        productModal.style.display = 'none';
        document.querySelector('.modal-container').classList.remove('fade-in');
    }, 300);
}

function initializeSizeSelection() {
    const sizePills = document.querySelectorAll('.size-pill');
    
    sizePills.forEach(pill => {
        pill.addEventListener('click', function() {
            selectedSize = this.dataset.size;
            updateSizeSelection();
        });
    });
}

function updateSizeSelection() {
    const sizePills = document.querySelectorAll('.size-pill');
    
    sizePills.forEach(pill => {
        if (selectedSize && pill.dataset.size === selectedSize) {
            pill.classList.add('selected');
        } else {
            pill.classList.remove('selected');
        }
    });
}

function placeOrder() {
    if (!selectedSize) {
        // Show error or prompt to select size
        showNotification('Please select a size before placing your order.', 'error');
        return;
    }
    
    // Get WhatsApp phone number (you can change this to the actual business number)
    const whatsappNumber = '923001234567'; // Replace with actual WhatsApp number
    
    // Create message
    const message = `Hello! I want to place an order from ${selectedCity}. Product: ${currentProduct.name} — Price: ${currentProduct.price}. Size: ${selectedSize}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Add success animation to button
    placeOrderBtn.classList.add('success-animation');
    
    // Show success notification
    showNotification('Opening WhatsApp...', 'success');
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset animation after delay
    setTimeout(() => {
        placeOrderBtn.classList.remove('success-animation');
    }, 1000);
    
    // Close modal after delay
    setTimeout(() => {
        closeModal();
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 24px;
                right: 24px;
                background-color: #FFFFFF;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                padding: 16px 20px;
                z-index: 3000;
                max-width: 350px;
                transform: translateX(400px);
                transition: transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .notification-success {
                border-left: 4px solid #10B981;
            }
            
            .notification-error {
                border-left: 4px solid #EF4444;
            }
            
            .notification-info {
                border-left: 4px solid #3B82F6;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 16px;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 20px;
                color: #6B7280;
                cursor: pointer;
                padding: 4px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            @media (max-width: 480px) {
                .notification {
                    top: 16px;
                    right: 16px;
                    left: 16px;
                    max-width: none;
                    transform: translateY(-100px);
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 4000);
}

function hideNotification(notification) {
    notification.classList.remove('show');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading state for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
        });
        
        img.addEventListener('error', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.innerHTML = '<div style="background-color: #F3F4F6; display: flex; align-items: center; justify-content: center; color: #6B7280; aspect-ratio: 3/4; border-radius: 8px;">Image not available</div>';
        });
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation focus
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #087F8C;
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyle);