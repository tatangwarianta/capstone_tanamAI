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
        id: 'Padi', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Padi',
        plantType: 'Padi',
        predictions: [
          {
            disease: 'Hawar Daun Bakteri',
            confidence: 0.85,
            description: 'Bercak kekuningan pada daun yang menyebar cepat dari ujung atau tepi daun.',
            treatment: 'Gunakan benih tahan penyakit dan semprotkan bakterisida berbahan aktif tembaga.'
          },
          {
            disease: 'Bercak Daun Coklat',
            confidence: 0.12,
            description: 'Bercak oval kecil berwarna coklat dengan bagian tengah berwarna keabu-abuan.',
            treatment: 'Lakukan rotasi tanaman dan gunakan fungisida yang mengandung mankozeb.'
          },
          {
            disease: 'Busuk Pelepah Daun',
            confidence: 0.03,
            description: 'Lesi atau bercak kecil pada pelepah daun, yang kemudian membesar dan membentuk noda berwarna abu-abu hingga cokelat.',
            treatment: 'Penggunaan varietas tahan, menghindari kepadatan tanaman yang tinggi, menjaga kebersihan lahan, dan menghindari luka pada tanaman.'
          },
        ]
      },
      {
        id: 'Jagung', 
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Jagung',
        plantType: 'Jagung',
        predictions: [
          {
            disease: 'Busuk Batang',
            confidence: 0.78,
            gejala: 'Batang bagian bawah menjadi lunak, berair, dan mudah rebah.',
            penanganan: 'Perbaiki sistem drainase lahan dan lakukan rotasi dengan tanaman bukan inang.'
          },
          {
            disease: 'Karat Daun',
            confidence: 0.15,
            gejala: 'Terdapat bercak-bercak kecil berwarna karat (oranye-coklat) pada permukaan daun.',
            penanganan: 'Tanam varietas tahan karat dan gunakan fungisida jika serangan parah.'
          },
          {
            disease: 'Serangan Hama Ulat Grayak',
            confidence: 0.07,
            gejala: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
            penanganan: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.'
          },
        ]
      },
      {
        id: 'Kentang',
        imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Kentang',
        plantType: 'Kentang',
        predictions: [
          {
            disease: 'Layu Bakteri',
            confidence: 0.83,
            description: 'Daun menguning dan tanaman cepat layu meskipun cukup air.',
            treatment: 'Cabut tanaman terinfeksi, semprotkan bakterisida, dan sterilisasi alat tanam.'
          },
          {
            disease: 'Busuk Batang',
            confidence: 0.17,
            description: 'Batang menjadi lunak dan mudah patah karena infeksi jamur.',
            treatment: 'Perbaiki drainase, rotasi tanaman, dan gunakan fungisida sistemik.'
          },
          {
            disease: 'Serangan Hama Ulat Grayak',
            confidence: 0.01,
            description: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
            treatment: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.'
          }
        ]
      },
    ];

    const storyList = document.getElementById('story-list');
    storyList.innerHTML = dummyData.map(data => `
      <a href="#/stories/${data.id}" class="story-card">
        <img src="${data.imageUrl}" alt="Foto ${data.plantType}" class="story-image" />
        <div class="story-info">
          <h3>${data.plantType}</h3>
          
          <div class="predictions-list">
            ${data.predictions.map(pred => `
              <div class="prediction-item">
                <div class="prediction-details">
                  <span class="disease-name">${pred.disease}</span>
                  <span class="confidence-score">${(pred.confidence * 100).toFixed(0)}%</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${(pred.confidence * 100)}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
          
        </div>
      </a>
    `).join('');
  }
};

export default StoriesView;