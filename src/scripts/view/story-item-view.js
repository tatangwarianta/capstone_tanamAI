const StoryItem = {
  render(story) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('story-card-detail');

    wrapper.innerHTML = `
    <div class="image-container">
      <img src="${story.imageUrl}" alt="Foto ${story.plantType}" class="story-image" />
      <div class="story-info">
        <h3>${story.plantType} - ${story.disease}</h3>
        <p><strong>Gejala:</strong> ${story.description}</p>
        <p><strong>Penanganan:</strong> ${story.treatment}</p>
      </div>
    </div>
    `;
    return wrapper;
  }
};

export default StoryItem;
