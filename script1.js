let cart = [];
const products = document.querySelectorAll('.add-to-cart');
const cartItems = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');

// Add event listeners to the "Add to Cart" buttons
products.forEach(product => {
    product.addEventListener('click', () => {
        const productElement = product.closest('.product');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // If the product is already in the cart, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // Add new product to the cart array with a quantity of 1
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart(); // Update the cart display
    });
});

// Function to update the cart display and total price
function updateCart() {
    cartItems.innerHTML = ''; // Clear the cart display
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity; // Calculate total price based on quantity
    });

    totalPriceElement.textContent = Total=total.toFixed(2);

    // Add event listeners to the "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        });
    });
}

// Function to redirect to payment page
function redirectToPayment() {
    if (cart.length > 0) {
        window.location.href = 'payment.html';
    } else {
        alert("Your cart is empty!");
    }
}