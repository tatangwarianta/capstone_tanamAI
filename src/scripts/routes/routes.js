import LoginView from '../view/login-view.js';
import RegisterView from '../view/register-view.js';
import HomeView from '../view/home-view.js';
import UploadView from '../view/upload-view.js';
import StoriesView from '../view/stories-view.js';
import OfflineView from '../view/offline-view.js';

import StoryItemPresenter from '../presenter/story-item-presenter.js'; // ✅ Import presenter

const routes = {
  '/login': LoginView,
  '/register': RegisterView,
  '/home': HomeView,
  '/upload': UploadView,
  '/stories': StoriesView,
  '/stories/:id': async (container) => {
    await StoryItemPresenter.init(container);
  },
  '/offline': OfflineView,
};

export default routes;
