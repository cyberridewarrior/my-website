// Add class to body when page is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('page-loaded');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Project filtering
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', function() {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    this.classList.add('active');
    this.setAttribute('aria-selected', 'true');
    
    // Filter projects
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
// Animate skill meters
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level;
      entry.target.style.width = level;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-level').forEach(meter => {
  skillObserver.observe(meter);
});
// Back to top button
document.querySelector('.back-to-top').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Show/hide based on scroll position
window.addEventListener('scroll', function() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    backToTop.style.opacity = '1';
    backToTop.style.visibility = 'visible';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.visibility = 'hidden';
  }
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