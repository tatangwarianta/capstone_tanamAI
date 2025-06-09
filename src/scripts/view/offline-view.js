const OfflineView = {
  render(container, stories) {
    container.innerHTML = '<h2>Bookmark Offline</h2><div id="offline-list"></div>';
    const listContainer = document.getElementById('offline-list');
    if (stories.length === 0) {
      listContainer.innerHTML = '<p>Belum ada cerita yang disimpan.</p>';
      return;
    }

    stories.forEach(story => {
      const item = document.createElement('div');
      item.className = 'offline-story';
      item.innerHTML = `
        <h4>${story.name}</h4>
        <p>${story.description}</p>
        <button class="unbookmark-btn" data-id="${story.id}">Unbookmark</button>
      `;
      listContainer.appendChild(item);
    });

    listContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('unbookmark-btn')) {
        const id = e.target.dataset.id;
        const IdbHelper = (await import('../db/idb-helper.js')).default;
        await IdbHelper.deleteStory(id);
        e.target.closest('.offline-story').remove();
      }
    });
  }
};

export default OfflineView;