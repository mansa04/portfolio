document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll Spy
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.querySelector('a').classList.remove('active');
            if (item.querySelector('a').getAttribute('href') === `#${current}`) {
                item.querySelector('a').classList.add('active');
            }
        });
        
        // Header scroll effect
        if (window.scrollY > 100) {
            document.querySelector('.header').classList.add('scrolled');
        } else {
            document.querySelector('.header').classList.remove('scrolled');
        }
        
        // Back to top button
        if (window.scrollY > 500) {
            document.getElementById('backToTop').style.opacity = '1';
            document.getElementById('backToTop').style.visibility = 'visible';
        } else {
            document.getElementById('backToTop').style.opacity = '0';
            document.getElementById('backToTop').style.visibility = 'hidden';
        }
    });

    // Back to Top Button
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Modal
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            const projectImage = projectCard.querySelector('img').getAttribute('src');
            
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="modal-image">
                    <img src="${projectImage}" alt="${projectTitle}" loading="lazy">
                </div>
                <div class="modal-text">
                    <h2>${projectTitle}</h2>
                    <p>${projectDescription}</p>
                    <div class="modal-tech">
                        <span>HTML/CSS</span>
                        <span>JavaScript</span>
                        <span>React</span>
                    </div>
                    <div class="modal-links">
                
                        <a href="#" class="btn secondary-btn">View Code</a>
                    </div>
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides.length) return;
    
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Auto-advance (optional)
    let slideInterval = setInterval(nextSlide, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Initialize
    updateSlider();
}

document.addEventListener('DOMContentLoaded', initTestimonialSlider);
    // Typed.js Effect
    if (document.querySelector('.typed-text')) {
        const typed = new Typed('.typed-text', {
            strings: ['Web Developer', 'UI/UX Designer', 'Freelancer'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Current Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    function scrollReveal() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initialize on load
});
// Animation triggers
const animateOnScroll = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
  
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  };
  
  document.addEventListener('DOMContentLoaded', animateOnScroll);

  