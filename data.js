import { products } from './main.js';


let currentFilter = 'all';
let currentSearch = '';

window.onload = function() {
    displayProducts(products);
};

function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');

    if (productsToShow.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = productsToShow.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <span style="font-size: 48px;">${product.image}</span>
                    </div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                </div>
            `).join('');
}

function filterProducts(category) {
    currentFilter = category;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    applyFilters();
}

function searchProducts() {
    currentSearch = document.getElementById('searchInput').value.toLowerCase();
    applyFilters();
}

function applyFilters() {
    let filteredProducts = products;

    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.category === currentFilter
        );
    }

    if (currentSearch) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch)
        );
    }

    displayProducts(filteredProducts);
}
