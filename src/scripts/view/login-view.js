const LoginView = {
  async render(container) {
    container.innerHTML = `
      <section class="form-container" aria-labelledby="login-heading">
        <h2 id="login-heading">Login</h2>
        <form id="login-form">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" placeholder="Email" required aria-required="true" />

          <label for="login-password">Password</label>
          <input type="password" id="login-password" placeholder="Password" required aria-required="true" class="password-input" />

          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Register</a></p>
        <div id="login-error" role="alert" style="color: red; margin-top: 1rem;"></div>
      </section>
    `;
  },

  bindLogin(handler) {
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');

    if (loginForm && loginEmail && loginPassword) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.clearError();
        handler({
          email: loginEmail.value,
          password: loginPassword.value,
        });
      });
    } else {
      console.error('Elemen login tidak ditemukan.');
    }
  },

  showError(message) {
    const errorContainer = document.getElementById('login-error');
    if (errorContainer) {
      errorContainer.textContent = message;
    } else {
      alert(message); // fallback jika elemen tidak ditemukan
    }
  },

  clearError() {
    const errorContainer = document.getElementById('login-error');
    if (errorContainer) {
      errorContainer.textContent = '';
    }
  },

  navigateTo(hash) {
    window.location.hash = hash;
  }
};

export default LoginView;
