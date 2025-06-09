import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';

import LoginPresenter from '../presenter/login-presenter.js';
import RegisterPresenter from '../presenter/register-presenter.js';
import HomePresenter from '../presenter/home-presenter.js';
import UploadPresenter from '../presenter/upload-presenter.js';
import StoriesPresenter from '../presenter/stories-presenter.js';
import OfflinePresenter from '../presenter/offline-presenter.js';
import StoryItemPresenter from '../presenter/story-item-presenter.js'; // ✅ tambahkan ini

import AuthModel from '../model/auth-model.js';

const presenterMap = {
  '/': LoginPresenter,
  '/login': LoginPresenter,
  '/register': RegisterPresenter,
  '/home': HomePresenter,
  '/upload': UploadPresenter,
  '/stories': StoriesPresenter,
  '/stories/:id': StoryItemPresenter, // ✅ tambahkan rute dinamis presenter
  '/offline': OfflinePresenter,
};

const App = {
  async init() {
    const url = UrlParser.parseActiveUrlWithCombiner();

    // Coba cocokkan path terhadap daftar routes
    let resolvedUrl = Object.keys(routes).find((route) => {
      if (route.includes(':')) {
        const baseRoute = route.split('/:')[0];
        return url.startsWith(baseRoute);
      }
      return route === url;
    });

    if (!resolvedUrl) {
      console.warn(`Route untuk '${url}' tidak ditemukan. Mengarahkan ke /login`);
      resolvedUrl = '/login';
    }

    const page = routes[resolvedUrl];
    const presenter = presenterMap[resolvedUrl];

    const mainContent = document.querySelector('#main-content');
    if (!mainContent) {
      console.error('Elemen #main-content tidak ditemukan.');
      return;
    }

    if (AuthModel.isLoggedIn() && (resolvedUrl === '/login' || resolvedUrl === '/')) {
      window.location.hash = '#/home';
      return;
    }

    try {
      if (document.startViewTransition) {
        await document.startViewTransition(async () => {
          mainContent.innerHTML = '';
          await page?.render?.(mainContent);
        }).finished;
      } else {
        mainContent.innerHTML = '';
        await page?.render?.(mainContent);
      }

      if (presenter?.init) {
        await presenter.init(mainContent); // ✅ akan memanggil presenter dinamis juga
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat merender halaman:', error);
      mainContent.innerHTML = '<p style="color:red;">Terjadi kesalahan saat memuat halaman.</p>';
    }
  },
};

export default App;
