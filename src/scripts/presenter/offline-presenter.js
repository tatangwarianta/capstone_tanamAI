import IdbHelper from '../db/idb-helper.js';
import OfflineView from '../view/offline-view.js';

const OfflinePresenter = {
  async init(container) {
    const stories = await IdbHelper.getAllStories();
    OfflineView.render(container, stories);
  },
};

export default OfflinePresenter;