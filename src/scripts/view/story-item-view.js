const dummyData = [
  {
    id: 'Padi',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Padi',
    plantType: 'Padi',
    generalEarlySteps: `

      <b>Langkah 1: Operasi "Petik dan Amankan"</b><br>
      Potong daun-daun yang menunjukkan gejala penyakit. Kumpulkan dalam kantong tertutup dan buang jauh dari lahan tanam untuk mencegah penyebaran.<br><br>

      <b>Langkah 2: Ciptakan Sirkulasi Udara</b><br>
      Jika tanaman terlalu rimbun, pangkas daun bagian bawah untuk memberi ruang sirkulasi. Ini membantu mencegah kelembapan yang mempercepat infeksi jamur.<br><br>

      <b>Langkah 3: Observasi Lanjutan</b><br>
      Lihat perkembangan dalam 2 hari. Jika gejala menyebar, lanjutkan dengan penyemprotan fungisida atau tindakan lebih lanjut sesuai panduan.
    `,
    predictions: [
      {
        disease: 'Hawar Daun Bakteri',
        confidence: 0.85,
        description: 'Bercak kekuningan pada daun yang menyebar cepat dari ujung atau tepi daun.',
        treatment: 'Gunakan benih tahan penyakit dan semprotkan bakterisida berbahan aktif tembaga.',
        productName: 'Bakterisida (Streptomisin)',
        productUrl: 'https://www.tokopedia.com/find/streptomisin-pertanian',
        earlySteps: [
          'Isolasi tanaman yang terinfeksi.',
          'Kurangi kelembapan sekitar tanaman.',
          'Bersihkan alat pertanian sebelum dan sesudah digunakan.'
        ]
      },
      {
        disease: 'Bercak Daun Coklat',
        confidence: 0.12,
        description: 'Bercak oval kecil berwarna coklat dengan bagian tengah berwarna keabu-abuan.',
        treatment: 'Lakukan rotasi tanaman dan gunakan fungisida yang mengandung mankozeb.',
        productName: 'Biopatek',
        productUrl: 'https://www.tokopedia.com/find/biopatek',
        earlySteps: [
          'Potong daun yang terinfeksi.',
          'Hindari penyiraman berlebihan.',
          'Perbaiki sirkulasi udara di antara tanaman.'
        ]
      },
      {
        disease: 'Busuk Pelepah Daun',
        confidence: 0.03,
        description: 'Lesi atau bercak kecil pada pelepah daun, yang kemudian membesar dan membentuk noda berwarna abu-abu hingga cokelat.',
        treatment: 'Penggunaan varietas tahan, menghindari kepadatan tanaman yang tinggi, menjaga kebersihan lahan, dan menghindari luka pada tanaman.',
        productName: 'Vertine',
        productUrl: 'https://www.tokopedia.com/find/vertine',
        earlySteps: [
          'Kurangi kepadatan tanaman.',
          'Singkirkan pelepah yang membusuk.',
          'Jaga agar lahan tetap kering dan bersih.'
        ]
      }
    ]
  },
  {
    id: 'Jagung',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Jagung',
    plantType: 'Jagung',
    generalEarlySteps: `

      <b>Langkah 1: Bersihkan Area Terinfeksi</b><br>
      Buang tanaman yang batangnya busuk atau ulat aktif terlihat. Ini menghentikan penyebaran ke tanaman sehat.<br><br>

      <b>Langkah 2: Perbaiki Drainase</b><br>
      Pastikan air tidak menggenang. Jagung sensitif terhadap kondisi tergenang, yang mempercepat pembusukan.<br><br>

      <b>Langkah 3: Monitoring Rutin</b><br>
      Lakukan inspeksi pagi dan sore. Bila terlihat tanda-tanda baru, lanjutkan dengan insektisida atau fungisida sesuai kebutuhan.
    `,
    predictions: [
      {
        disease: 'Busuk Batang',
        confidence: 0.78,
        gejala: 'Batang bagian bawah menjadi lunak, berair, dan mudah rebah.',
        penanganan: 'Perbaiki sistem drainase lahan dan lakukan rotasi dengan tanaman bukan inang.',
        productName: 'Tastes',
        productUrl: 'https://www.tokopedia.com/find/tastes',
        earlySteps: [
          'Periksa dan perbaiki drainase di lahan.',
          'Hindari penyiraman berlebihan.',
          'Buang tanaman yang sudah terinfeksi parah.'
        ]
      },
      {
        disease: 'Karat Daun',
        confidence: 0.15,
        gejala: 'Terdapat bercak-bercak kecil berwarna karat (oranye-coklat) pada permukaan daun.',
        penanganan: 'Tanam varietas tahan karat dan gunakan fungisida jika serangan parah.',
        productName: 'Metahara',
        productUrl: 'https://www.tokopedia.com/find/metahara',
        earlySteps: [
          'Gunakan benih varietas tahan.',
          'Hindari penggunaan pupuk nitrogen berlebihan.',
          'Buang daun yang terkena karat.'
        ]
      },
      {
        disease: 'Serangan Hama Ulat Grayak',
        confidence: 0.07,
        gejala: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
        penanganan: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.',
        productName: 'Biowasil',
        productUrl: 'https://www.tokopedia.com/find/biowasil',
        earlySteps: [
          'Periksa tanaman secara rutin di pagi dan sore hari.',
          'Ambil ulat secara manual bila memungkinkan.',
          'Tanam tanaman pengusir hama seperti bunga matahari di sekitarnya.'
        ]
      }
    ]
  },
  {
    id: 'Kentang',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tanaman+Kentang',
    plantType: 'Kentang',
    generalEarlySteps: `

      <b>Langkah 1: Isolasi Tanaman Sakit</b><br>
      Cabut dan buang tanaman yang layu total agar penyakit tidak menyebar ke umbi lainnya.<br><br>

      <b>Langkah 2: Sterilisasi Alat</b><br>
      Setelah menyentuh tanaman sakit, bersihkan alat dengan desinfektan. Kentang sangat rentan terhadap kontaminasi silang.<br><br>

      <b>Langkah 3: Cek Drainase</b><br>
      Pastikan air tidak tergenang di sekitar akar. Kentang perlu media yang cepat kering agar tidak busuk.
    `,
    predictions: [
      {
        disease: 'Layu Bakteri',
        confidence: 0.83,
        description: 'Daun menguning dan tanaman cepat layu meskipun cukup air.',
        treatment: 'Cabut tanaman terinfeksi, semprotkan bakterisida, dan sterilisasi alat tanam.',
        productName: 'Serenade',
        productUrl: 'https://www.tokopedia.com/find/serenade',
        earlySteps: [
          'Singkirkan tanaman yang layu.',
          'Gunakan air bersih untuk penyiraman.',
          'Desinfeksi alat-alat pertanian secara rutin.'
        ]
      },
      {
        disease: 'Busuk Batang',
        confidence: 0.17,
        description: 'Batang menjadi lunak dan mudah patah karena infeksi jamur.',
        treatment: 'Perbaiki drainase, rotasi tanaman, dan gunakan fungisida sistemik.',
        productName: 'besromil',
        productUrl: 'https://www.tokopedia.com/find/besromil',
        earlySteps: [
          'Pastikan lahan tidak tergenang air.',
          'Potong batang yang busuk.',
          'Tanam kembali dengan jarak yang cukup longgar.'
        ]
      },
      {
        disease: 'Serangan Hama Ulat Grayak',
        confidence: 0.01,
        description: 'Daun bolong-bolong, pertumbuhan tanaman terhambat.',
        treatment: 'Gunakan insektisida berbahan aktif klorpirifos atau spinosad. Lakukan monitoring rutin.',
        productName: 'Biowasil',
        productUrl: 'https://www.tokopedia.com/find/biowasil',
        earlySteps: [
          'Gunakan perangkap feromon untuk menarik hama.',
          'Periksa tanaman di malam hari.',
          'Tutup tanaman muda dengan jaring pelindung.'
        ]
      }
    ]
  }
];


const StoryItem = {
  render(story) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('story-detail-container');

    wrapper.innerHTML = `
  <h2 class="plant-type-title">${story.plantType}</h2>
  <img src="${story.imageUrl}" alt="Foto ${story.plantType}" class="detail-story-image" />

  <div class="detail-predictions-list">
    <h3 class="prediction-list-title">Kemungkinan Penyakit Terdeteksi:</h3>

    ${story.predictions.map(prediction => `
      <div class="prediction-detail-item">
        <div class="prediction-header">
          <h4>${prediction.disease}</h4>
          <span class="confidence-score">${(prediction.confidence * 100).toFixed(0)}% Keyakinan</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${(prediction.confidence * 100)}%;"></div>
        </div>
        <div class="disease-info">
          <p><strong>Gejala:</strong> ${prediction.description || prediction.gejala || '-'}</p>
          <p><strong>Penanganan:</strong> ${prediction.treatment || prediction.penanganan || '-'}</p>
          <a href="${prediction.productUrl}" target="_blank" class="product-link">Beli Obat: ${prediction.productName}</a>
        </div>
      </div>
    `).join('')}

    ${story.generalEarlySteps ? `
      <div class="prediction-detail-item" style="margin-top: 40px;">
        <div class="prediction-header">
          <h4>Langkah Awal yang Bisa Dilakukan</h4>
          <span class="confidence-score">Umum</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: 100%; background-color: #ccc;"></div>
        </div>
        <div class="disease-info">
          ${story.generalEarlySteps}
        </div>
      </div>
    ` : ''}
    </div>

      <div class="back-button-container" style="margin-top: 30px; text-align: center;">
        <a href="#/stories" class="btn-back">← Kembali ke Daftar Hasil</a>
      </div>
    `;


    return wrapper;
  }
};

export default StoryItem;
