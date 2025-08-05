document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your User ID
    emailjs.init('Qpd0vhian51lRBjIe'); // Replace with your actual User ID
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormMessage('Please fill in all fields', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                return;
            }
            
            // Send email using EmailJS
            emailjs.sendForm('service_33ak028', 'template_xxl0jku', this)
                .then(() => {
                    showFormMessage('Message sent successfully!', 'success');
                    contactForm.reset();
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    showFormMessage(`Failed to send message. Error: ${error.text || 'Unknown error'}`, 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        formMessage.style.opacity = '1';
        
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 300);
        }, 5000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});