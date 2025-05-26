import UrlParser from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import LoginPresenter from '../presenter/login-presenter.js';
import RegisterPresenter from '../presenter/register-presenter.js';
import HomePresenter from '../presenter/home-presenter.js';
import UploadPresenter from '../presenter/upload-presenter.js';
import StoriesPresenter from '../presenter/stories-presenter.js';

const presenterMap = {
  '/': LoginPresenter,
  '/login': LoginPresenter,
  '/register': RegisterPresenter,
  '/home': HomePresenter,
  '/upload': UploadPresenter,
  '/stories': StoriesPresenter,
};

const App = {
  async init() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const presenter = presenterMap[url];
    const mainContent = document.querySelector('#main-content');

    if (!mainContent) {
      console.error('Elemen #main-content tidak ditemukan di HTML.');
      return;
    }

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        mainContent.innerHTML = '';
        await page.render(mainContent);
      }).finished.then(() => {
        if (presenter?.init) presenter.init(mainContent); // ✅ Kirim container
      });
    } else {
      mainContent.innerHTML = '';
      await page.render(mainContent);
      if (presenter?.init) presenter.init(mainContent); // ✅ Kirim container
    }
  },
};

export default App;
