import Api from '../model/api.js';

class StoriesModel {
    getToken() {
        return localStorage.getItem('token');
    }

    async getStories(token) {
        try {
        const response = await Api.getStories(token);
        return response;
        } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
        }
    }

    async uploadStory(formData, token) {
        try {
        const response = await Api.uploadStory(formData, token);
        return response;
        } catch (error) {
        console.error('Error uploading story:', error);
        throw error;
        }
    }
}

export default new StoriesModel();
