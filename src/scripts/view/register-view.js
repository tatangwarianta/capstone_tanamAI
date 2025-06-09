const RegisterView = {
  async render(container) {
    container.innerHTML = `
      <section class="form-container" aria-labelledby="register-heading">
        <h2 id="register-heading">Register</h2>
        <form id="register-form">
          <label for="register-name">Nama</label>
          <input type="text" id="register-name" placeholder="Nama" required />
          <label for="register-email">Email</label>
          <input type="email" id="register-email" placeholder="Email" required />
          <label for="register-password">Password</label>
          <input type="password" id="register-password" placeholder="Password" required class="password-input" />
          <button type="submit">Register</button>
        </form>
        <p id="register-message" aria-live="polite" style="color: red;"></p>
        <p>Sudah punya akun? <a href="#/">Login</a></p>
      </section>
    `;
  },

  bindRegister(handler) {
    const form = document.getElementById('register-form');
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');

    if (form && nameInput && emailInput && passwordInput) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        handler({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value,
        });
      });
    } else {
      console.error('Elemen form tidak ditemukan.');
    }
  },

  showMessage(message) {
    const messageElement = document.getElementById('register-message');
    if (messageElement) {
      messageElement.style.color = 'green';
      messageElement.textContent = message;
    }
  },

  showError(error) {
    const messageElement = document.getElementById('register-message');
    if (messageElement) {
      messageElement.style.color = 'red';
      messageElement.textContent = error;
    }
  },

  navigateTo(hash) {
    window.location.hash = hash;
  }
};

export default RegisterView;
