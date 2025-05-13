document.addEventListener('DOMContentLoaded', () => {
// --- Selectors ---
const productCards = document.querySelectorAll('.product-card');
const cartLink = document.querySelector('.cart-link span');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const newsletterForm = document.querySelector('.call-to-action form');

// --- Data ---
let cart = [];

// --- Functions ---

/**
 * Adds a product to the cart.
 *
 * @param {HTMLElement} button - The button element that was clicked.
 */
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('Ksh.', ''));

    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1,
        });
    }

    updateCartDisplay();
    showNotification(`Added ${productName} to cart!`, 'success');
}

/**
 * Updates the cart display in the header.
 */
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartLink.textContent = `Cart (${totalItems})`;
}

/**
 * Displays a notification message to the user.
 *
 * @param {string} message - The message to display.
 * @param {string} type - The type of notification ('success' or 'error').
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(type);
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove after 3 seconds
}

/**
 * Handles the newsletter form submission.
 *
 * @param {Event} event - The form submission event.
 */
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email === '') {
        showNotification('Please enter your email address.', 'error');
        return;
    }

    // Basic email validation (you can use a more robust validation library)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // In a real application, you would send the email to a server
    console.log('Subscribed with email:', email);
    showNotification('Thank you for subscribing!', 'success');
    newsletterForm.reset();
}

// --- Event Listeners ---

// Add event listeners to the "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        addToCart(button);
    });
});

// Add event listener to the newsletter form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// --- Initial setup ---
updateCartDisplay(); // Initial cart display update
});


