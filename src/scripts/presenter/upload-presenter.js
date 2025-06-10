import Api from '../model/api.js';
import AuthModel from '../model/auth-model.js';
import UploadView from '../view/upload-view.js';

const UploadPresenter = {
    async init(container) {
        await UploadView.render(container);

        const token = AuthModel.getToken(); 
        if (!token) {
            UploadView.showAlert('Silakan login terlebih dahulu');
            UploadView.navigateTo('#/');
            return;
        }
        let photoBlob = null;
        let stream = null;

        const cleanupCameraStream = () => {
            if (stream) {
                stream.getTracks().forEach((t) => t.stop());
                stream = null;
                UploadView.stopCameraStream();
            }
        };

        UploadView.handleHashChangeOnLeave(cleanupCameraStream);

        UploadView.bindBackHome(() => {
            UploadView.navigateTo('#/home');
        });

        UploadView.bindStartCamera(async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                UploadView.startCameraStream(stream);
            } catch (err) {
                UploadView.showAlert('Tidak dapat mengakses kamera: ' + err.message);
            }
        });

        UploadView.bindStopCamera(() => {
            cleanupCameraStream();
        });

        UploadView.bindTakePhoto(async () => {
            const blob = await UploadView.takePhotoFromVideo();
            if (blob) {
                photoBlob = blob;
                UploadView.showImagePreview(photoBlob);
                cleanupCameraStream();
            } else {
                UploadView.showAlert('Gagal mengambil foto.');
            }
        });

        UploadView.bindFileInputChange((file) => {
            if (file) {
                photoBlob = file;
                UploadView.showImagePreview(file);
            }
        });

        UploadView.bindFormSubmit(async (e) => {
        e.preventDefault();
        UploadView.setFormDisabled(true);

        const predictionType = UploadView.getSelectedPredictionType(); // ✅ Ambil nilai radio
        const currentToken = AuthModel.getToken();

        if (!photoBlob) {
            UploadView.showAlert('Harap pilih gambar atau ambil foto.');
            UploadView.setFormDisabled(false);
            return;
        }

        if (!currentToken) {
            UploadView.showAlert('Token tidak ditemukan, silakan login ulang.');
            UploadView.navigateTo('#/');
            UploadView.setFormDisabled(false);
            return;
        }

        const formData = new FormData();
        formData.append('photo', photoBlob);
        formData.append('plantType', predictionType); // ✅ Tambahkan ke FormData

        try {
            const response = await Api.uploadStory(formData, currentToken);
            if (!response.error) {
            UploadView.showAlert('Cerita berhasil diupload!');
            UploadView.navigateTo('#/stories');
            } else {
            UploadView.showAlert(response.message || 'Upload gagal.');
            }
        } catch (err) {
            UploadView.showAlert('Terjadi kesalahan saat upload.');
            console.error(err);
        } finally {
            UploadView.setFormDisabled(false);
            cleanupCameraStream();
        }
        });
    },
};

export default UploadPresenter;
