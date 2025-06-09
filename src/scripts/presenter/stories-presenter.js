import StoriesModel from '../model/stories-model.js';
import StoriesView from '../view/stories-view.js';

const StoriesPresenter = {
  async init(container) {
    await StoriesView.render(container);

    const token = StoriesModel.getToken();

    if (!token) {
      StoriesView.showError('Silakan login terlebih dahulu');
      StoriesView.navigateTo('#/login');
      return;
    }

    try {
      const response = await StoriesModel.getStories(token);
      if (response.error) {
        StoriesView.showError(response.message);
      } else {
        StoriesView.showStories(response.listStory);
      }
    } catch (error) {
      console.error('Gagal memuat cerita:', error);
    }

    // ✅ Tambahkan ini agar dummy muncul
    await StoriesView.afterRender();
  },
};


export default StoriesPresenter;
