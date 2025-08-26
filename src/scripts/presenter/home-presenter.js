import HomeView from '../view/home-view.js';
import PushSubscriptionHelper from '../utils/push-subscription.js';
import AuthModel from '../model/auth-model.js';

const HomePresenter = {
    async init(container) {
        await HomeView.render(container);

        // Cek jika sedang offline dan user sudah login via localStorage
        if (!navigator.onLine && AuthModel.isLoggedIn()) {
        HomeView.showAlert('Anda sedang menggunakan aplikasi dalam mode offline.');
        }

        HomeView.bindLogout(this.handleLogout.bind(this));
    },

    async handleLogout() {
        AuthModel.logout(); // gunakan AuthModel karena logout hanya lokal
        HomeView.navigateTo('#/login');
    },
};

export default HomePresenter;
