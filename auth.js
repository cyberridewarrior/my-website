document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  const switchToSignup = document.getElementById('switchToSignup');

  // Toggle password visibility
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.classList.toggle('visible');
    });
  }

  // Form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData);
      
      try {
        // Here you would typically make an API call
        console.log('Submitting:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success (in a real app, you'd redirect or show a message)
        alert('Login successful!');
        loginForm.reset();
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    });
  }

  // Switch to signup (example functionality)
  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Switching to signup form');
      // In a real app, you'd toggle between login/signup forms
    });
  }
});