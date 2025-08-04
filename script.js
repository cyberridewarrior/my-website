document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation Toggle
  // ======================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate the scroll position considering the fixed header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });

 // ======================
// Back to Top Button
// ======================
const backToTop = document.querySelector('.back-to-top');
  
if (backToTop) {
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // Smooth scroll to top
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Update URL without jumping
    if (history.pushState) {
      history.pushState(null, null, '#top');
    } else {
      window.location.hash = 'top';
    }
  });
}

  // ======================
  // Form Submission
  // ======================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would normally send to a server
      console.log('Form submitted:', data);
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thank you for your message! I'll get back to you soon.</p>
      `;
      
      // Insert after form
      contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
      
      // Reset form
      contactForm.reset();
      
      // Remove message after 5 seconds
      setTimeout(() => {
        successMsg.classList.add('fade-out');
        setTimeout(() => successMsg.remove(), 500);
      }, 5000);
    });
  }

  // ======================
  // Scroll Animations
  // ======================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .contact-item, .contact-form, .section-header');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate');
      }
    });
  };
  
  // Run on load and scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // ======================
  // Typewriter Effect
  // ======================
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
      const text = line.textContent;
      line.textContent = '';
      line.style.visibility = 'visible';
      
      setTimeout(() => {
        let i = 0;
        const typing = setInterval(() => {
          if (i < text.length) {
            line.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 100);
      }, index * 500);
    });
  }

  // ======================
  // Current Year for Footer
  // ======================
  const copyrightYear = document.querySelector('.copyright');
  if (copyrightYear) {
    copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', new Date().getFullYear());
  }
});