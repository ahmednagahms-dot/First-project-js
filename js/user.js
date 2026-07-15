
// checkLogin
function checkLoginState() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const isLoggedIn = JSON.parse(localStorage.getItem("loggedIn"));

    loggedIn = !!(loggedInUser && isLoggedIn);

    const usernameDisplay = document.getElementById("user-name");
    if (usernameDisplay) {
        usernameDisplay.textContent =
            loggedIn ? `Hello, ${loggedInUser.firstName}` : "";
    }

    return loggedIn;
}


function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("firstName");

    localStorage.removeItem("cart");
    localStorage.removeItem("favorites");
    localStorage.removeItem("allProducts");
    
    products.forEach(product => {
        product.isInCart = false;
        product.isFavorite = false;
        product.quantity = 0;
    });

    window.location.href = "index.html";
}


//  ADD card
function toggleCart(productId) {
    if (!checkLoginState()) {
        redirectTo('login.html');
        return;
    }

    const product = products.find(item => item.id === productId);
    if (!product) return;

    if (product.isInCart) {
        product.isInCart = false;
        product.quantity = 0;
    } else {
        product.isInCart = true;
        product.quantity = 1;
    }

    // saveCartAndFavorites();
    // updateCartDropdown();
    // updateCartCount();
    // renderProducts(products);
    refreshCartUI()

    if (window.location.href.includes('card.html') && typeof renderCartItems === 'function') {
        renderCartItems();
    }
}


//    (FAVORITES)

function toggleFavorite(productId) {
    if (!checkLoginState()) {
        redirectTo('login.html');
        return;
    }

    const product = products.find(item => item.id === productId);
    if (!product) return;

    product.isFavorite = !product.isFavorite;

    saveCartAndFavorites();
    renderProducts(products);

    if (window.location.href.includes('card.html') && typeof renderFavoriteItems === 'function') {
        renderFavoriteItems();
    }
}



//   save and load lolocalStorage
  
function saveCartAndFavorites() {
    const cart = products.filter(product => product.isInCart);
    const favorites = products.filter(product => product.isFavorite);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('allProducts', JSON.stringify(products));
}

function loadCartAndFavorites() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    products.forEach(product => {
        const cartProduct = cart.find(p => p.id === product.id);
        const favoriteProduct = favorites.find(p => p.id === product.id);

        if (cartProduct) {
            product.isInCart = true;
            product.quantity = cartProduct.quantity || 1;
        } else {
            product.isInCart = false;
            product.quantity = 0;
        }

        product.isFavorite = !!favoriteProduct;
    });
}


//    dropdown السلة 
  
function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;

    const count = products
        .filter(product => product.isInCart)
        .reduce((total, item) => total + item.quantity, 0);

    cartCountEl.textContent = count;
}

function updateCartDropdown() {
    const cartDropdownItems = document.getElementById('cart-dropdown-items');
    const totalPriceElement = document.getElementById('cart-total-price');
    if (!cartDropdownItems || !totalPriceElement) return;

    const cartItems = products.filter(product => product.isInCart);
    cartDropdownItems.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartDropdownItems.innerHTML = '<p style="text-align: center;">Your cart is empty.</p>';
        totalPriceElement.textContent = '$0';
    } else {
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;

            const cartItemHtml = `
                <div class="flex justify-between items-center p-3 border-b border-gray-100">
                    <div>
                        <h3 class="font-semibold text-gray-800">${item.name}</h3>
                        <p class="text-blue-400">Price: $${item.price * item.quantity}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button onclick="decreaseQuantity(${item.id})" class="border w-7 h-7 rounded flex items-center justify-center hover:bg-gray-50">-</button>
                            <span class="font-medium">${item.quantity}</span>
                            <button onclick="increaseQuantity(${item.id})" class="border w-7 h-7 rounded flex items-center justify-center hover:bg-gray-50">+</button>
                        </div>
                    </div>
                    <button onclick="toggleCart(${item.id})" class="text-red-500 hover:text-red-700 p-2">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;




            cartDropdownItems.insertAdjacentHTML('beforeend', cartItemHtml);

        });

        totalPriceElement.textContent = `$${totalPrice}`;
    }

    updateCartCount();
}

function toggleCartDropdown() {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown?.classList.toggle('hidden');
}



  
 
document.addEventListener('DOMContentLoaded', () => {
    loadCartAndFavorites();
    checkLoginState()
    

    if (document.getElementById('products-row')) {
        renderProducts(products);
    }
    updateCartDropdown();
    updateCartCount();
});