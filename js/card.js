

//   السلة card
 
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    const cartItems = products.filter(product => product.isInCart);

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class=" text-gray-500 col-span-full">Your cart is empty.</p>';
        updateTotalPrice();
        return;
    }

const cartItemsHtml = cartItems.map(item => `
    <div class="flex flex-row  items-center w-[450px] p-[30px] bg-white  rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg border  hover:border-blue-600" data-product-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md flex-shrink-0">
        <div class="flex-1">
            <h5 class="font-bold text-gray-800 mb-1">${item.name}</h5>
            <p class="text-sm text-gray-500 mb-1">Category: ${item.category}</p>
            <p class="text-sm text-gray-700 mb-3">Price: $<span id="itemPrice${item.id}">${item.price * item.quantity}</span></p>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <button onclick="decreaseQuantity(${item.id})" class="border w-8 h-8 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-400">-</button>
                    <span id="itemQuantity${item.id}" class="font-medium">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})" class="border w-8 h-8 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-400">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    Remove from Cart
                </button>
            </div>
        </div>
    </div>
`).join('');

    cartItemsContainer.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-8">${cartItemsHtml}</div>`;

    updateTotalPrice();
}



//  Favorite
  

function renderFavoriteItems() {
    const favoriteItemsContainer = document.getElementById('favorite-items');
    if (!favoriteItemsContainer) return;

    const favoriteItems = products.filter(product => product.isFavorite);

    if (favoriteItems.length === 0) {
        favoriteItemsContainer.innerHTML = '<p class=" text-gray-500 col-span-full">You have no favorite items.</p>';
        return;
    }

const favoriteItemsHtml = favoriteItems.map(item => `
    <div class="favorite-card border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 hover:shadow-lg bg-white overflow-hidden" data-product-id="${item.id}">
        <img src="${item.image}" class="w-full h-48 " alt="${item.name}">
        <div class="p-4 flex flex-col items-center text-center">
            <h5 class="text-lg font-bold text-gray-800 mb-1">${item.name}</h5>
            <p class="text-sm text-gray-500 mb-3">Category: ${item.category}</p>
            <i class="fas fa-heart text-xl cursor-pointer transition-colors duration-200 text-red-500 hover:text-red-600 "
               onclick="toggleFavorite(${item.id})"></i>
        </div>
    </div>
`).join('');




favoriteItemsContainer.innerHTML = favoriteItemsHtml;


}

function refreshCartUI(){
saveCartAndFavorites();
updateCartDropdown();
updateCartCount();
renderCartItems();
renderFavoriteItems();
renderProducts(products);
updateTotalPrice();
}



//   increase and decrease
   
function increaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.isInCart) return;

    product.quantity++;

    // saveCartAndFavorites();
    // updateCartDropdown();
    // renderCartItems();
    refreshCartUI();
}

function decreaseQuantity(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.isInCart) return;

    product.quantity--;

    if (product.quantity <= 0) {
        product.isInCart = false;
        product.quantity = 0;
    }

    // saveCartAndFavorites();
    // updateCartDropdown();
    // renderCartItems();
    // renderProducts(products); 
    refreshCartUI();
}


//   remove card
  
function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    product.isInCart = false;
    product.quantity = 0;

    // saveCartAndFavorites();
    // updateCartDropdown();
    // updateCartCount();
    // renderCartItems();
    // renderProducts(products);
    refreshCartUI();
}



//    clear item Cart
   
function clearCart() {
    products.forEach(product => {
        product.isInCart = false;
        product.quantity = 0;
    });

    // saveCartAndFavorites();
    // updateCartDropdown();
    // updateCartCount();
    // renderCartItems();
    // renderProducts(products);
    refreshCartUI();
}


//    total price
   
function updateTotalPrice() {
    const totalPriceEl = document.getElementById('totalPrice');
    if (!totalPriceEl) return;

    const totalPrice = products
        .filter(product => product.isInCart)
        .reduce((total, product) => total + product.price * product.quantity, 0);

    totalPriceEl.textContent = new Intl.NumberFormat("en-US",{style:"currency", currency:"USD"
    }).format(totalPrice)
    }



document.addEventListener('DOMContentLoaded', () => {
    // renderCartItems();
    // renderFavoriteItems();
    refreshCartUI()
});







