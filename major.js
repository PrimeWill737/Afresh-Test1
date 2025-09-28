// JavaScript for interactivity and accessibility
        // Form validation and submission handling
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for demo

            // Basic validation (already handled by HTML5 required, but enhanced)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value.trim();

            if (name && email && product && message) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 1500);
            } else {
                alert('Please fill in all fields.');
            }
        });

        // Buy product button functionality
        function buyProduct(productName) {
            // Simulate purchase
            if (confirm(`Would you like to buy ${productName}?`)) {
                alert(`Purchase of ${productName} confirmed! Redirecting to checkout...`);
                // In a real app, redirect to checkout page
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Keyboard navigation enhancement: Trap focus in modal if needed, but no modals here
        // Ensure buttons are focusable and announce actions