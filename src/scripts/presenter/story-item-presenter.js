import StoryItem from '../view/story-item-view.js';
import Api from '../model/api.js';

const StoryItemPresenter = {
  async init(container) {
    const url = window.location.hash;
    const storyId = url.split('/')[2];

    const token = localStorage.getItem('token');
    container.innerHTML = '';

    if (!token) {
      container.innerHTML = '<p>Silakan login untuk melihat detail.</p>';
      return;
    }

    try {
      const response = await Api.getStories(token);
      if (response.error || !response.data) {
        container.innerHTML = '<p>Gagal memuat data.</p>';
        return;
      }

      const story = response.data.find((item) => String(item.id) === storyId);
      if (!story) {
        container.innerHTML = '<p>Story tidak ditemukan.</p>';
        return;
      }

      const element = StoryItem.render(story);
      container.appendChild(element);
    } catch (error) {
      console.error(error);
      container.innerHTML = '<p>Terjadi kesalahan saat memuat data.</p>';
    }
  }
};

export default StoryItemPresenter;
