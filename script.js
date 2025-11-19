// Product data
const products = [
    // Men's Products
    {
        id: 0,
        name: "Classic White Shirt",
        description: "Premium cotton blend, perfect for formal occasions and everyday wear",
        price: "PKR 2,500",
        priceNumber: 2500,
        category: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop"
    },
    {
        id: 1,
        name: "Denim Jacket",
        description: "Classic fit denim jacket with vintage wash finish",
        price: "PKR 4,200",
        priceNumber: 4200,
        category: "men",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Black Trousers",
        description: "Slim fit formal trousers in premium polyester blend",
        price: "PKR 3,800",
        priceNumber: 3800,
        category: "men",
        image: "https://images.unsplash.com/photo-1578587018452-8927c328b87d?w=400&h=600&fit=crop"
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        description: "Soft cotton t-shirt with modern fit design",
        price: "PKR 1,800",
        priceNumber: 1800,
        category: "men",
        image: "https://images.unsplash.com/photo-1592878967665-1f8f32b1c4c8?w=400&h=600&fit=crop"
    },
    // Women's Products
    {
        id: 4,
        name: "Summer Dress",
        description: "Elegant floral dress perfect for summer occasions",
        price: "PKR 5,200",
        priceNumber: 5200,
        category: "women",
        image: "https://images.unsplash.com/photo-1566479179817-c62c24b9c2a1?w=400&h=600&fit=crop"
    },
    {
        id: 5,
        name: "Silk Blouse",
        description: "Luxurious silk blouse with elegant design",
        price: "PKR 6,800",
        priceNumber: 6800,
        category: "women",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop"
    },
    {
        id: 6,
        name: "Designer Jeans",
        description: "Premium fit jeans with stretch comfort",
        price: "PKR 4,500",
        priceNumber: 4500,
        category: "women",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop"
    },
    {
        id: 7,
        name: "Knit Cardigan",
        description: "Cozy knit cardigan for layered styling",
        price: "PKR 5,500",
        priceNumber: 5500,
        category: "women",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400&h=600&fit=crop"
    },
    // Kids' Products
    {
        id: 8,
        name: "Kids Hoodie",
        description: "Comfortable cotton hoodie for active kids",
        price: "PKR 2,800",
        priceNumber: 2800,
        category: "kids",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?w=400&h=600&fit=crop"
    },
    {
        id: 9,
        name: "Kids Pants",
        description: "Durable and comfortable everyday pants",
        price: "PKR 2,200",
        priceNumber: 2200,
        category: "kids",
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f31c9?w=400&h=600&fit=crop"
    },
    {
        id: 10,
        name: "Kids T-Shirt",
        description: "Fun and colorful t-shirt for playtime",
        price: "PKR 1,500",
        priceNumber: 1500,
        category: "kids",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=600&fit=crop"
    },
    {
        id: 11,
        name: "Kids Jacket",
        description: "Warm and protective jacket for all seasons",
        price: "PKR 3,800",
        priceNumber: 3800,
        category: "kids",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=600&fit=crop"
    }
];

// Global variables
let selectedCity = localStorage.getItem('selectedCity') || '';
let selectedSize = null;
let currentProduct = null;
let currentCategory = 'all';

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
    
    // Initialize navigation menu
    initializeNavigationMenu();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize category filters
    initializeCategoryFilters();
    
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

function initializeNavigationMenu() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(category);
        });
    });
}

function initializeCategoryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active filter button
            filterBtns.forEach(filter => filter.classList.remove('active'));
            this.classList.add('active');
            
            // Update navigation menu if it exists
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(nav => nav.classList.remove('active'));
            const correspondingNav = document.querySelector(`[data-category="${category}"]`);
            if (correspondingNav) {
                correspondingNav.classList.add('active');
            }
            
            // Filter products
            filterProducts(category);
        });
    });
}

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on nav items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                
                // Reset hamburger menu
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

function filterProducts(category) {
    currentCategory = category;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update products count
    updateProductsCount();
}

function updateProductsCount() {
    const visibleProducts = document.querySelectorAll('.product-card[style*="block"], .product-card:not([style*="none"])');
    const count = visibleProducts.length;
    
    // You can add a products count display here if needed
    console.log(`Showing ${count} products`);
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