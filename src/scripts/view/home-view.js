const HomeView = {
  async render(container) {
    container.innerHTML = `
      <div class="jumbotron">
        <img src="public/images/jumbotron.jpg" alt="Banner Tanam AI" class="jumbotron-image" />
        <div class="jumbotron-text">
          <h2 id="home-heading">Selamat Datang di Tanam AI</h2>
          <h3 id="welcome-message">
            Kami membantu Anda mendeteksi penyakit pada tanaman secara cepat dan akurat
          </h3>
          <div class="jumbotron-buttons">
            <a id="btn-deteksi" href="#/upload">Deteksi!</a>
            <a id="btn-result" href="#/stories">Hasil</a>
          </div>
        </div>
      </div>
    `;
  },

  isPushSupported() {
    return 'serviceWorker' in navigator && 'PushManager' in window;
  },

  bindLogout(handler) {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', handler);
    }
  },

  navigateTo(hash) {
    window.location.hash = hash;
  },

  showAlert(message) {
    alert(message);
  }
};

export default HomeView;
