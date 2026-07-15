class Product {
    constructor(id, name, price, category, genre, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.genre = genre;
        this.image = image;
        this.isFavorite = false;
        this.isInCart = false;
        this.quantity = 1;  
    }
}

const defaultProducts = [
    new Product(1, 'Egypt Home Jersey', 400, 'T-shirts', 'men', 'img/img (1).jpg'),
    new Product(2, 'Adidas Black Shorts', 300, 'shorts', 'men', 'img/shorts (3).jpg'),
    new Product(3, 'France Home Jersey', 150, 'T-shirts', 'men', 'img/img (3).jpg'),
    new Product(4, 'Algeria Away Jersey', 200, 'T-shirts', 'men', 'img/img (2).jpg'),
    new Product(5, 'Adidas Shoes Black', 300, 'Football-shoes', 'men', 'img/shoes (1).jpg'),
    new Product(6, 'Mexico Home Jersey', 350, 'T-shirts', 'men', 'img/img (4).jpg'),
    new Product(7, 'Nike Black Shorts', 300, 'shorts', 'men', 'img/shorts (1).jpg'),
    new Product(8, 'Portugal Home Jersey', 580, 'T-shirts', 'men', 'img/img (5).jpg'),
    new Product(9, 'Adidas Shoes Tongue', 300, 'Football-shoes', 'men', 'img/shoes (3).jpg'),
    new Product(10, 'Brazil Home Jersey', 150, 'T-shirts', 'men', 'img/img (6).jpg'),
    new Product(11, 'Belgium Home Jersey', 100, 'T-shirts', 'men', 'img/img (7).jpg'),
    new Product(12, 'Adidas Shoes Purple', 300, 'Football-shoes', 'men', 'img/shoes (4).jpg'),
    new Product(13, 'Argentina Home Jersey', 500, 'T-shirts', 'men', 'img/img (8).jpg'),
    new Product(14, 'Spain Home Jersey', 300, 'T-shirts', 'men', 'img/img (9).jpg'),
    new Product(15, 'Adidas Shoes Blue', 300, 'Football-shoes', 'men', 'img/shoes (2).jpg'),

];

let products = [...defaultProducts];

// دالة عرض المنتجات
function renderProducts(productList) {
    console.log('Rendering products:', productList);
    
    const productsRow = document.getElementById('products-row');
    if (!productsRow) {
        return;
    }

    productsRow.innerHTML = '';

    if (productList.length === 0) {
        productsRow.innerHTML = '<p class="no-products">عذراً، لم يتم العثور على منتجات مطابقة!</p>';
        return; 
    }

    productList.forEach(product => {
        const productCard = `
        <div class="product-card ">
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-details">
                <div class="card-details-text">
                <h5 class="product-title">${product.name}</h5>
                <p class="product-price">Price: $${product.price}</p>
                <p class="product-category">Category: ${product.category}</p>
                <div class="actions-wrapper">
                    <i class="fas fa-heart favorite-icon ${product.isFavorite ? 'active' : ''}" 
                       onclick="toggleFavorite(${product.id})"></i>
                      <button id="log"
                        class="add-to-cart-btn ${product.isInCart ? 'bg-red-500 text-white hover:bg-red-700' : ''}"
                        onclick="toggleCart(${product.id})">
                           ${product.isInCart ? 'Remove from Cart' : 'Add To Cart'}
                       </button>
                       </div>
                </div>
            </div>
        </div>`;
        
        productsRow.insertAdjacentHTML('beforeend', productCard);
    });
}

// دالة البحث
function searchProducts() {
    const searchType = document.getElementById('searchType').value;
    const searchText = document.getElementById('searchBox').value.toLowerCase();
    
    const filteredProducts = products.filter(product => {
        if (searchType === 'name') {
            return product.name.toLowerCase().includes(searchText);
        } else if (searchType === 'category') {
            return product.category.toLowerCase().includes(searchText);
        }
        return false;
    });
    
    renderProducts(filteredProducts);
}

// التوجيه
function redirectTo(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});
let loggedIn = false;