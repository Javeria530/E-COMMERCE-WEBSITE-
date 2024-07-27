const bar = document.getElementById('bar');
const navbar = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        navbar.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
}
const products = [
    {
        name: "Stylish Maxies",
        price: 25,
        img: "images/img7.png",
        link: "sp1.html",
        description: "Rose Boutique",
        category: "maxies",
        brand: "roseboutique",
        rating: 5,
        popularity: 100
    },
    {
        name: "Stylish Maxies",
        price: 25,
        img: "images/img6.png",
        link: "sp2.html",
        description: "Rose Boutique",
        category: "maxies",
        brand: "roseboutique",
        rating: 5,
        popularity: 90
    },
    {
        name: "Stylish Maxies",
        price: 25,
        img: "images/img9.png",
        link: "sp3.html",
        description: "Rose Boutique",
        category: "maxies",
        brand: "roseboutique",
        rating: 5,
        popularity: 80
    },
    {
        name: "Stylish Maxies",
        price: 25,
        img: "images/img8.png",
        link: "sp4.html",
        description: "Rose Boutique",
        category: "maxies",
        brand: "roseboutique",
        rating: 5,
        popularity: 70
    }
];

function displayProducts(productsToDisplay) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    productsToDisplay.forEach(product => {
        resultsDiv.innerHTML += `
            <div class="product" onclick="window.location.href='${product.link}'">
                <img src="${product.img}" alt="Product Image">
            </div>
        `;
    });
    document.getElementById('resultsCount').innerText = `Number of products found: ${productsToDisplay.length}`;
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value;
    const price = document.getElementById('priceSelect').value;
    const brand = document.getElementById('brandSelect').value;
    const rating = document.getElementById('ratingSelect').value;

    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (price) {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    if (brand) {
        filteredProducts = filteredProducts.filter(product => product.brand === brand);
    }

    if (rating) {
        const minRating = Number(rating.split('-')[0]);
        filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
    }

    sortProducts(filteredProducts);
}

function sortProducts(productsToSort) {
    const sortValue = document.getElementById('sortSelect').value;

    let sortedProducts = [...productsToSort];

    if (sortValue === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'popularity') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortValue === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(sortedProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    
});
const productImages = {
    '1': 'images/img7.png',
    '2': 'images/img6.png',
    '3': 'images/img9.png',
    '4': 'images/img8.png'
};

function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    let imgSrc = productImages[productName] || 'images/default.png'; 

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ name: productName, price: price, quantity: 1, imgSrc: imgSrc });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " has been added to your cart!");
    window.location.href = 'cart.html';
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.querySelector("#cart tbody");
    cartTable.innerHTML = '';

    cart.forEach(item => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td><a href="#" onclick="removeFromCart('${item.name}')"><i class="far fa-times-circle"></i></a></td>
            <td><img src="${item.imgSrc}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" /></td>
            <td>$${item.price * item.quantity}</td>
        `;

        cartTable.appendChild(row);
    });
}

function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateQuantity(productName, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = parseInt(quantity, 10);
        if (product.quantity < 1) product.quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

