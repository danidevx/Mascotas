document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 25 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.15 + 0.05;
        particle.style.animation = `float3D ${15 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        particlesContainer.appendChild(particle);
    }

    document.querySelectorAll('.card-particles').forEach(container => {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.classList.add('card-particle');

            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particle.style.animationDelay = `${Math.random() * 2}s`;

            particle.style.setProperty('--tx', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--ty', `${Math.random() * 100 - 50}px`);
            particle.style.setProperty('--tz', `${Math.random() * 50}px`);

            container.appendChild(particle);
        }
    });

    document.querySelectorAll('.image-card').forEach(card => {
        const lightEffect = card.querySelector('.light-effect');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            lightEffect.style.setProperty('--x', `${x}%`);
            lightEffect.style.setProperty('--y', `${y}%`);
        });
    });

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const galleries = document.querySelectorAll('.image-gallery');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');

            // Remove active class from all buttons and galleries
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleries.forEach(gallery => gallery.classList.remove('active'));

            // Add active class to clicked button and corresponding gallery
            this.classList.add('active');
            document.getElementById(`${tab}-gallery`).classList.add('active');
        });
    });

    // Shopping cart functionality
    let cart = [];
    const cartIcon = document.getElementById('cartIcon');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Product data
    const products = {
        1: { name: 'Snack para Cachorros', price: 5.99, image: 'https://png.pngtree.com/png-vector/20241119/ourmid/pngtree-delicious-bone-shaped-dog-biscuit-png-image_14457807.png' },
        2: { name: 'Snack para Jóvenes', price: 7.99, image: 'https://png.pngtree.com/png-vector/20240724/ourmid/pngtree-dog-biscuits-on-transparent-background-png-image_13219662.png' },
        3: { name: 'Snack para Adultos', price: 9.99, image: 'https://png.pngtree.com/png-vector/20250520/ourmid/pngtree-two-crispy-dog-biscuits-shaped-like-bones-on-black-background-closeup-png-image_16330678.png' },
        4: { name: 'Snack para Gatitos', price: 4.99, image: 'img/cat1.png' },
        5: { name: 'Snack para Jóvenes Gatos', price: 6.99, image: 'img/cat2.png' },
        6: { name: 'Snack para Gatos Adultos', price: 8.99, image: 'img/cat3.png' }
    };

    // Add to cart function
    function addToCart(productId) {
        const product = products[productId];
        if (product) {
            cart.push(product);
            updateCartDisplay();
            showAddToCartNotification(product.name);
        }
    }

    // Add event listeners for add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });

    // Update cart display
    function updateCartDisplay() {
        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío. ¡Agrega algunos snacks!</p>';
            cartTotal.innerHTML = '<p>Total: $0.00</p>';
            checkoutBtn.disabled = true;
        } else {
            let itemsHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;
                itemsHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
                    </div>
                `;
            });

            cartItems.innerHTML = itemsHTML;
            cartTotal.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
            checkoutBtn.disabled = false;
        }
    }

    // Remove from cart function
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    };

    // Show notification when adding to cart
    function showAddToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.textContent = `${productName} agregado al carrito`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 0, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert(`¡Gracias por tu compra! Total: $${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}\n\nTu pedido ha sido procesado.`);
            cart = [];
            updateCartDisplay();
        }
    });

    // Cart icon click to go to cart tab
    cartIcon.addEventListener('click', function() {
        // Switch to cart tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        galleries.forEach(gallery => gallery.classList.remove('active'));

        document.querySelector('[data-tab="carrito"]').classList.add('active');
        document.getElementById('carrito-gallery').classList.add('active');
    });

    const cards = document.querySelectorAll('.image-card');
    const overlay = document.getElementById('overlay');
    const expandedImageContainer = document.getElementById('expandedImageContainer');
    const expandedImage = document.getElementById('expandedImage');
    let activeCard = null;

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();

            if (activeCard) {
                closeActiveCard();
                return;
            }

            const cardId = parseInt(this.getAttribute('data-card-id'));
            const backImage = this.querySelector('.card-back img');
            const imageSrc = backImage.src;
            const cardTitle = this.querySelector('.image-title').textContent;
            const cardPrice = this.querySelector('.product-price').textContent;

            expandedImage.src = imageSrc;
            expandedImage.alt = backImage.alt;

            // Update expanded controls
            document.getElementById('expandedTitle').textContent = cardTitle;
            document.getElementById('expandedPrice').textContent = cardPrice;
            document.getElementById('expandedAddToCart').setAttribute('data-product-id', cardId);

            overlay.classList.add('active');
            expandedImageContainer.classList.add('active');

            this.style.transformOrigin = 'center center';
            this.classList.add('active');
            activeCard = this;

            createRippleEffect(e, this);
        });

        // Add double-click to add to cart
        card.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const cardId = parseInt(this.getAttribute('data-card-id'));
            addToCart(cardId);
        });
    });

    function closeActiveCard() {
        if (activeCard) {
            activeCard.classList.remove('active');
            overlay.classList.remove('active');
            expandedImageContainer.classList.remove('active');

            setTimeout(() => {
                activeCard = null;
            }, 400);
        }
    }

    overlay.addEventListener('click', closeActiveCard);
    expandedImageContainer.addEventListener('click', closeActiveCard);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeCard) {
            closeActiveCard();
        }
    });

    function createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 100;
        `;

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});
