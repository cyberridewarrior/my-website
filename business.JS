document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    disable: window.innerWidth < 768
  });

  // DOM Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');
  const pricingTabs = document.querySelectorAll('.pricing-tab');
  const monthlyPrices = document.querySelectorAll('.price.monthly');
  const yearlyPrices = document.querySelectorAll('.price.yearly');
  const contactForm = document.getElementById('businessForm');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const slider = document.querySelector('.testimonial-slider');

  // Mobile Navigation
  function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
    
    // Toggle body scroll
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
  }

  menuToggle.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Sticky Navigation
  let lastScroll = 0;
  const navbarHeight = navbar.offsetHeight;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.style.transform = 'translateY(0)';
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > navbarHeight) {
      // Scroll down - hide navbar
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scroll up - show navbar
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });

  // Pricing Tabs
  function handlePricingTabClick(e) {
    pricingTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');
    
    const isMonthly = e.target.dataset.plan === 'monthly';
    monthlyPrices.forEach(p => p.classList.toggle('hidden', !isMonthly));
    yearlyPrices.forEach(p => p.classList.toggle('hidden', isMonthly));
  }

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', handlePricingTabClick);
  });

  // Testimonial Slider
  let currentSlide = 0;
  let slideInterval;
  
  function showSlide(n) {
    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
    
    testimonialSlides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(slideInterval);
  }

  // Initialize slider
  showSlide(0);
  startSlider();

  // Event listeners for slider controls
  nextBtn.addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
  });

  prevBtn.addEventListener('click', () => {
    stopSlider();
    prevSlide();
    startSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlider();
      showSlide(index);
      startSlider();
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);

  // Form Validation
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset errors
      this.querySelectorAll('.error-message').forEach(el => el.remove());
      this.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      // Validate fields
      const name = this.querySelector('#name');
      const email = this.querySelector('#email');
      const service = this.querySelector('#service');
      const message = this.querySelector('#message');
      let isValid = true;

      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
      }

      if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }

      if (service.value === '') {
        showError(service, 'Please select a service');
        isValid = false;
      }

      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
      }

      if (isValid) {
        // Form submission would go here
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
      }
    });
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message';
    errorElement.style.color = '#ef4444';
    errorElement.style.marginTop = '0.5rem';
    errorElement.style.fontSize = '0.875rem';
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Responsive adjustments
  function handleResize() {
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      document.body.style.overflow = 'auto';
    }
    
    // Reinitialize AOS for mobile
    AOS.refresh();
  }

  window.addEventListener('resize', handleResize);
});
// Enhanced Testimonial Slider
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
  // Hide current slide with animation
  const currentActive = document.querySelector('.testimonial-slide.active');
  if (currentActive) {
    currentActive.style.animation = 'slideOut 0.5s ease-in-out';
    setTimeout(() => {
      currentActive.classList.remove('active');
      currentActive.style.animation = '';
    }, 500);
  }

  // Calculate new slide index
  currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
  
  // Show new slide with animation
  testimonialSlides[currentSlide].classList.add('active');
  testimonialSlides[currentSlide].style.animation = 'slideIn 0.5s ease-in-out';
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Initialize all animations
function initAnimations() {
  // Animate services
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animation = `fadeInUp 0.5s ease-out ${0.1 * index}s`;
    card.style.animationFillMode = 'both';
  });

  // Animate footer
  const footerElements = document.querySelectorAll('.footer-logo, .footer-links, .footer-contact');
  footerElements.forEach((el, index) => {
    el.style.animation = `fadeInUp 0.5s ease-out ${0.2 * index}s`;
    el.style.animationFillMode = 'both';
  });

  // Animate contact form inputs
  const formInputs = document.querySelectorAll('.form-group');
  formInputs.forEach((input, index) => {
    input.style.animation = `fadeInUp 0.5s ease-out ${0.1 * index}s`;
    input.style.animationFillMode = 'both';
  });
}

// Call initAnimations when page loads
window.addEventListener('load', initAnimations);
