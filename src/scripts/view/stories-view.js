const StoriesView = {
  async render(container) {
    container.innerHTML = `
      <a href="#story-container" class="skip-link">Lewati ke konten</a>
      <main id="main-content">
        <section class="story-container" id="story-container" aria-labelledby="story-heading">
          <h2 id="story-heading">Hasil Deteksi</h2>
          <div class="story-list" id="story-list"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const dummyData = [
      {
        id: 'padi-hawar-daun', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Padi',
        plantType: 'Padi',
        disease: 'Hawar Daun Bakteri',
        description: 'Gejala berupa bercak kekuningan pada daun yang menyebar cepat.',
        treatment: 'Gunakan benih tahan penyakit, semprotkan bakterisida seperti streptomisin.'
      },
      {
        id: 'jagung-busuk-batang', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Jagung',
        plantType: 'Jagung',
        disease: 'Busuk Batang',
        description: 'Batang menjadi lunak dan mudah patah karena infeksi jamur.',
        treatment: 'Perbaiki drainase, rotasi tanaman, dan gunakan fungisida sistemik.'
      },
      {
        id: 'kentang-layu-bakteri',
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Kentang',
        plantType: 'Kentang',
        disease: 'Layu Bakteri',
        description: 'Daun menguning dan tanaman cepat layu meskipun cukup air.',
        treatment: 'Cabut tanaman terinfeksi, semprotkan bakterisida, dan sterilisasi alat tanam.'
      },
      {
        id: 'jagung-ulat-grayak',
        imageUrl: 'https://via.placeholder.com/300x200?text=Hama+Ulat+Grayak',
        plantType: 'Jagung',
        disease: 'Serangan Hama Ulat Grayak',
        description: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
        treatment: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.'
      }
    ];

    const storyList = document.getElementById('story-list');
    storyList.innerHTML = dummyData.map(data => `
      <a href="#/stories/${data.id}" class="story-card">
        <img src="${data.imageUrl}" alt="Foto ${data.plantType}" class="story-image" />
        <div class="story-info">
          <h3>${data.plantType} - ${data.disease}</h3>
          <p><strong>Gejala:</strong><br/>${data.description}</p>
          <p><strong>Penanganan:</strong><br/>${data.treatment}</p>
        </div>
      </a>
    `).join('');
  }
};

export default StoriesView;