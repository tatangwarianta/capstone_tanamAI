const UploadView = {
  async render(container) {
    container.innerHTML = `
      <main id="main-content">
        <section class="upload-container" aria-labelledby="upload-heading">
          <h2 id="upload-heading">Upload Foto Tanaman</h2>
          <form id="upload-form" class="form-container">

            <label for="photo-camera">Ambil Gambar dari Kamera</label>
            <video id="video" autoplay playsinline></video>
            <div class="camera-controls">
              <button type="button" id="start-camera">Mulai Kamera</button>
              <button type="button" id="stop-camera" style="display:none;">Matikan Kamera</button>
              <button type="button" id="take-photo">Ambil Foto</button>
            </div>
            <label for="photo-file" class="custom-file-label">Unggah Gambar dari File</label>
            
            <input type="file" id="photo-file" accept="image/*" class="custom-file-input"/>
            <div id="file-preview" class="file-preview"></div>
            <canvas id="canvas" style="display: none;"></canvas>

            <fieldset class="prediction-options">
              <legend>Pilih Jenis Prediksi</legend>
              <label><input type="radio" name="prediction-type" value="padi" checked /> Padi</label>
              <label><input type="radio" name="prediction-type" value="jagung" /> Jagung</label>
              <label><input type="radio" name="prediction-type" value="kentang" /> Kentang</label>
              <label><input type="radio" name="prediction-type" value="hama" /> Hama</label>
            </fieldset>

            <button type="submit">Upload</button>
          </form>
          <button id="back-home">Kembali</button>
        </section>
      </main>
    `;
  },

  bindBackHome(handler) {
    document.getElementById('back-home').addEventListener('click', handler);
  },

  bindUseCurrentLocation(handler) {
    document.getElementById('use-current-location').addEventListener('click', handler);
  },

  bindStartCamera(handler) {
    document.getElementById('start-camera').addEventListener('click', handler);
  },

  bindStopCamera(handler) {
    document.getElementById('stop-camera').addEventListener('click', handler);
  },

  bindTakePhoto(handler) {
    document.getElementById('take-photo').addEventListener('click', handler);
  },

  bindFileInputChange(callback) {
    const input = document.getElementById('photo-file');
    if (input) {
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        callback(file);
      });
    }
  },

  bindFormSubmit(handler) {
    document.getElementById('upload-form').addEventListener('submit', handler);
  },

  getDescription() {
    return document.getElementById('description').value;
  },

  showAlert(message) {
    alert(message);
  },

  navigateTo(hash) {
    window.location.hash = hash;
  },

  updateCoordinatesText(text) {
    document.getElementById('coordinates').textContent = text;
  },

  showImagePreview(blobOrUrl) {
    const previewContainer = document.getElementById('file-preview');
    previewContainer.innerHTML = '';
    const img = new Image();
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.src = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
    previewContainer.appendChild(img);
  },

  startCameraStream(stream) {
    const video = document.getElementById('video');
    video.srcObject = stream;
    document.getElementById('start-camera').style.display = 'none';
    document.getElementById('stop-camera').style.display = 'inline-block';
  },

  stopCameraStream() {
    const video = document.getElementById('video');
    video.srcObject = null;
    document.getElementById('start-camera').style.display = 'inline-block';
    document.getElementById('stop-camera').style.display = 'none';
  },

  async takePhotoFromVideo() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  },

  handleHashChangeOnLeave(callback) {
    const handler = () => {
      callback();
      window.removeEventListener('hashchange', handler);
    };
    window.addEventListener('hashchange', handler);
  },


  setFormDisabled(isDisabled) {
    const btn = document.querySelector('#upload-form button[type="submit"]');
    if (btn) btn.disabled = isDisabled;
  },

  getSelectedPredictionType() {
    const selected = document.querySelector('input[name="prediction-type"]:checked');
    return selected ? selected.value : null;
  },
};

export default UploadView;
