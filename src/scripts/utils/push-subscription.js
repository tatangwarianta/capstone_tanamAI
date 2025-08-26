function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

const PushSubscriptionHelper = {
    async subscribeUserToPush() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        alert('Izin notifikasi tidak diberikan.');
        return;
    }

    const registration = await navigator.serviceWorker.ready;

    const publicKey = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    console.log('Push subscription:', subscription);

    // Kirim ke server
    const token = localStorage.getItem('token');
    await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth'))))
        }
        })
    });

    // Tampilkan notifikasi lokal sebagai feedback
    if (registration.active) {
        registration.active.postMessage({
        type: 'SHOW_LOCAL_NOTIFICATION',
        payload: {
            title: 'Notifikasi telah aktif',
            options: {
            body: 'Anda akan menerima notifikasi mulai sekarang',
            },
        },
        });
    } else {
        console.warn('Service worker belum aktif.');
    }
},

async isUserSubscribed() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
},

async unsubscribeUserFromPush() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
        await subscription.unsubscribe();
        console.log('User unsubscribed from push notifications.');

      // Hapus dari server
        const token = localStorage.getItem('token');
        await fetch('https://story-api.dicoding.dev/v1/notifications/subscribe', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endpoint: subscription.endpoint
        })
        });
    }
    }
};

export default PushSubscriptionHelper;
