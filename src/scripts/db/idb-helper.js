import { openDB } from 'idb';

const DB_NAME = 'story-db';
const DB_VERSION = 1;
const STORE_NAME = 'stories';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

const IdbHelper = {
  async saveStory(story) {
    const db = await dbPromise;
    await db.put(STORE_NAME, story);

    // Cache gambar untuk offline
    if (story.photoUrl) {
      try {
        const response = await fetch(story.photoUrl, { mode: 'no-cors' });
        if (response && (response.ok || response.type === 'opaque')) {
          const cache = await caches.open('story-app-shell-v5');
          await cache.put(story.photoUrl, response.clone());
          console.log('[IDBHelper] Gambar disimpan ke cache:', story.photoUrl);
        } else {
          console.warn('[IDBHelper] Gagal fetch gambar:', story.photoUrl);
        }
      } catch (err) {
        console.warn('[IDBHelper] Error simpan gambar ke cache:', story.photoUrl, err);
      }
    }
  },

  async saveStoriesBulk(stories) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    for (const story of stories) {
      tx.store.put(story);
    }
    await tx.done;
  },

  async getAllStories() {
    return (await dbPromise).getAll(STORE_NAME);
  },

  async deleteStory(id) {
    const db = await dbPromise;
    const story = await db.get(STORE_NAME, id);

    await db.delete(STORE_NAME, id);

    if (story && story.photoUrl) {
      const cache = await caches.open('story-app-shell-v5');
      await cache.delete(story.photoUrl);
      console.log('[IDBHelper] Gambar dihapus dari cache:', story.photoUrl);
    }
  },

  async clearAllStories() {
    return (await dbPromise).clear(STORE_NAME);
  }
};

export default IdbHelper;
