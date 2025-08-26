import CONFIG from '../config.js';

const StoriesView = {
  async render(container) {
    container.innerHTML = `
      <a href="#story-container" class="skip-link">Skip to content</a>
      <main id="main-content">
        <section class="story-container" id="story-container" aria-labelledby="story-heading">
          <h2 id="story-heading">Detection Results</h2>
          <div class="story-list" id="story-list"></div>
        </section>
      </main>
    `;
  },

  showStories(stories) {
    const storyList = document.getElementById('story-list');

    if (!stories || stories.length === 0) {
      storyList.innerHTML = '<p>No detection found.</p>';
      return;
    }

    storyList.innerHTML = stories.map((story) => {
      const imageUrl = story.image_url || `${CONFIG.IMAGE_BASE_URL}/${story.image_filename}`;
      const predictions = story.top3 || [];
      const createdAt = new Date(story.created_at).toLocaleString('id-ID');

      return `
      <a href="#/stories/${story.id}" class="story-card">
        <img src="${imageUrl}" alt="Detection Result" class="story-image" />
        <div class="story-info">
          <h3>Jenis Prediksi: ${story.model_type}</h3>
          <p><small><strong>Uploaded:</strong> ${createdAt}</small></p>

          <div class="predictions-list">
            ${predictions.map(pred => `
              <div class="prediction-item">
                <div class="prediction-details">
                  <span class="disease-name">${pred.label}</span>
                  <span class="confidence-score">${(pred.probability * 100).toFixed(0)}%</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${(pred.probability * 100)}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </a>
    `;

    }).join('');
  },

  showError(message) {
    const storyList = document.getElementById('story-list');
    storyList.innerHTML = `<p class="error">${message}</p>`;
  },

  navigateTo(path) {
    window.location.hash = path;
  },

  async afterRender() {
    // Tidak diperlukan saat ini
  }
};

export default StoriesView;
