// Sample product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Men's Fashion"
    },
    {
        id: 2,
        name: "Blue Denim Jeans",
        price: 59.99,
        image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Women's Fashion"
    },
    {
        id: 3,
        name: "Luxury Watch",
        price: 99.99,
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Accessories"
    },
    {
        id: 4,
        name: "Summer Floral Dress",
        price: 49.99,
        image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Women's Fashion"
    },
    {
        id: 5,
        name: "Classic Sneakers",
        price: 79.99,
        image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Accessories"
    },
    {
        id: 6,
        name: "Formal Blue Shirt",
        price: 45.99,
        image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "Men's Fashion"
    }
];

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const productGrid = document.querySelector('.product-grid');

// Toggle Mobile Menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="image-loading">
            <img class="lazy-image" 
                 src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                 data-src="${product.image}"
                 alt="${product.name}">
        </div>
        <div class="product-details">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="#" class="btn btn-primary btn-block">
                View Details
            </a>
        </div>
    `;
    return card;
}

// Lazy Loading Implementation
function lazyLoadImages() {
    const images = document.querySelectorAll('.lazy-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Handle Image Loading Errors
function handleImageError(img) {
    img.onerror = () => {
        img.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
    };
}

// Initialize product display
function initializeProducts() {
    products.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    lazyLoadImages();
    
    // Add error handling to all images
    document.querySelectorAll('img').forEach(handleImageError);
});

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});
