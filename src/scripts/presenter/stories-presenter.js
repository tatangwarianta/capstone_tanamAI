import api from '../model/api.js';
import StoriesView from '../view/stories-view.js';

const StoriesPresenter = {
  async init(container) {
    await StoriesView.render(container);

    const token = localStorage.getItem('token');

    if (!token) {
      StoriesView.showError('Please log in first.');
      StoriesView.navigateTo('#/login');
      return;
    }

    try {
      const response = await api.getStories(token);
      console.log('DATA:', response.data); // debug

      if (response.error) {
        StoriesView.showError(response.message || 'Failed to load stories.');
      } else {
        StoriesView.showStories(response.data); // ✅ perbaikan utama
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
      StoriesView.showError('Server error. Please try again later.');
    }

    await StoriesView.afterRender();
  },
};

export default StoriesPresenter;
