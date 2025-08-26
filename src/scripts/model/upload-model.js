import Api from '../model/api.js';

class UploadModel {
    async uploadStory(formData, token) {
        try {
        const response = await Api.uploadStory(formData, token);
        return response;
        } catch (error) {
        console.error('Upload story error:', error);
        throw error;
        }
    }
}

export default new UploadModel();
