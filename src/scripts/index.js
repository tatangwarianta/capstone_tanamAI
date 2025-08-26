import App from './presenter/app.js';
import './db/idb-helper.js';
import '../styles/main.css';
import { showImageOverlay } from './utils/overlay-helper.js';


const skipLink = document.querySelector('.skip-link');

// Disable skip link sebelum DOM siap
if (skipLink) {
  skipLink.setAttribute('aria-disabled', 'true');  // aksesibilitas: tandai disabled
  skipLink.style.pointerEvents = 'none';           // nonaktifkan klik
  skipLink.style.opacity = '0.5';                   // beri indikasi visual tombol disable (opsional)
  skipLink.style.visibility = 'hidden';             // sembunyikan dulu
}

// Fungsi untuk mengaktifkan skip link setelah halaman siap
const enableSkipLink = () => {
  if (!skipLink) return;

  skipLink.removeAttribute('aria-disabled');
  skipLink.style.pointerEvents = 'auto';
  skipLink.style.opacity = '1';
  skipLink.style.visibility = 'visible';            // tampilkan setelah siap
};

// Fungsi untuk menampilkan atau menyembunyikan skip link di halaman tertentu
const showSkipLinkOnStoriesPage = () => {
  if (!skipLink) return;

  if (window.location.hash === '#/stories') {
    skipLink.style.display = 'inline-block';
  } else {
    skipLink.style.display = 'none';
  }
};

// Event listener untuk mengaktifkan skip link saat halaman sudah load
window.addEventListener('load', async () => {
  await App.init();
  enableSkipLink();
  showSkipLinkOnStoriesPage();
});

// Event listener hashchange tetap seperti biasa
window.addEventListener('hashchange', () => {
  App.init();
  showSkipLinkOnStoriesPage();
});

// Event listener klik skip link
if (skipLink) {
  skipLink.addEventListener('click', (e) => {
    // Jika masih disable, jangan jalankan fungsinya
    if (skipLink.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const storyContainer = document.getElementById('story-container');
    if (!storyContainer) return;

    storyContainer.setAttribute('tabindex', '-1');
    storyContainer.focus();
    storyContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    const removeTabindex = () => {
      storyContainer.removeAttribute('tabindex');
      storyContainer.removeEventListener('blur', removeTabindex);
    };
    storyContainer.addEventListener('blur', removeTabindex);
  });
}



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Service Worker registered with scope:', reg.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
function updateServiceWorkerHash() {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'UPDATE_HASH',
      hash: window.location.hash
    });
  }
}

window.addEventListener('hashchange', updateServiceWorkerHash);
window.addEventListener('load', updateServiceWorkerHash);
window.showImageOverlay = showImageOverlay;


