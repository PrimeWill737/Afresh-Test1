"use strict";
// JS & TS number limit, bringing the birth of BigInt
// const maxInt = Number.MAX_SAFE_INTEGER;
// console.log(maxInt);
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts - Core logic for form and buy button (simulates backend calls)
class ProductHandler {
    apiBase = '/api'; // Hypothetical backend base URL
    // Typed function for buy now button
    buyProduct(productName, price) {
        if (confirm(`Would you like to buy ${productName} for ${price}?`)) {
            const purchaseData = { productName, price };
            // Simulate backend call (replace with real endpoint)
            fetch(`${this.apiBase}/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(purchaseData)
            })
                .then((response) => {
                if (!response.ok)
                    throw new Error('Purchase failed');
                return response.json();
            })
                .then((data) => {
                alert(`Purchase of ${productName} confirmed! Order ID: ${data.orderId || 'SIM-123'}. Redirecting to checkout...`);
                // In real app: window.location.href = '/checkout';
            })
                .catch((error) => {
                console.error('Purchase error:', error);
                alert('Purchase failed. Please try again.');
            });
        }
    }
    // Typed function for form submission
    handleContactForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = {
            name: form.querySelector('#name').value.trim(),
            email: form.querySelector('#email').value.trim(),
            product: form.querySelector('#product').value,
            message: form.querySelector('#message').value.trim()
        };
        // Type-safe validation
        if (!this.validateFormData(formData)) {
            alert('Please fill in all fields correctly.');
            return;
        }
        const submitBtn = form.querySelector('#submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        // Simulate backend call (replace with real endpoint)
        fetch(`${this.apiBase}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((response) => {
            if (!response.ok)
                throw new Error('Submission failed');
            return response.json();
        })
            .then((data) => {
            alert(`Thank you, ${formData.name}! Message sent. Reference: ${data.reference || 'REF-456'}.`);
            form.reset();
        })
            .catch((error) => {
            console.error('Form submission error:', error);
            alert('Submission failed. Please try again.');
        })
            .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
    validateFormData(data) {
        return !!(data.name &&
            data.email &&
            data.product &&
            data.message &&
            this.isValidEmail(data.email));
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
// Global initialization (attach event listeners)
document.addEventListener('DOMContentLoaded', () => {
    const handler = new ProductHandler();
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (event) => handler.handleContactForm(event));
    }
    // Update onclick handlers in HTML to use the typed function (via global exposure)
    window.buyProduct = (productName, price) => {
        handler.buyProduct(productName, price);
    };
    // Smooth scrolling for navigation (existing vanilla JS enhancement)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href') || '');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
//# sourceMappingURL=index.js.map