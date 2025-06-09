let mapInstance = null;

function setupOverlayContainer() {
    if (document.getElementById('image-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'image-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: '1000',
        cursor: 'pointer',
        color: '#fff',
    });
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('tabindex', '-1');

    overlay.innerHTML = `
        <div id="overlay-background" aria-label="Tutup overlay" tabindex="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></div>
        <img id="overlay-image" alt="Gambar Cerita" style="max-width: 90vw; max-height: 70vh; border-radius: 12px; z-index:1001;"/>
        <div id="overlay-map" style="width: 50%; height: 300px; margin-top: 20px; border-radius: 12px; z-index:1001;"></div>
    `;

    document.body.appendChild(overlay);

    const closeOverlay = () => {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.setAttribute('inert', '');
        if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
        }
    };

    document.getElementById('overlay-background').addEventListener('click', closeOverlay);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') closeOverlay();
    });
    }

    export function showImageOverlay(photoUrl, lat, lng, name = '', description = '') {
    setupOverlayContainer();

    const overlay = document.getElementById('image-overlay');
    const overlayImage = document.getElementById('overlay-image');
    const overlayMapDiv = document.getElementById('overlay-map');

    overlayMapDiv.innerHTML = '';
    overlayImage.src = photoUrl;
    overlayImage.alt = `Gambar cerita oleh ${name}`;
    overlay.style.display = 'flex';
    overlay.removeAttribute('aria-hidden');
    overlay.removeAttribute('inert');
    overlay.focus();

    if (lat != null && lng != null) {
        setTimeout(() => {
        mapInstance = L.map(overlayMapDiv).setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);

        L.marker([lat, lng]).addTo(mapInstance)
            .bindPopup(`<b>${name}</b><br>${description}`)
            .openPopup();
        }, 100);
    } else {
        overlayMapDiv.innerHTML = '<p style="color:white; padding:10px;">Lokasi tidak tersedia.</p>';
    }
}
