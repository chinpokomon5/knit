// sw.js - Updated for Lock Screen Visibility
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    return self.clients.claim();
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_ROW') {
        const rowNum = event.data.row;
        const patternRow = (rowNum - 1) % 3 + 1;
        
        let title = `Row ${rowNum} Complete`;
        let body = `Next: Row ${rowNum + 1} (Pattern Row ${patternRow})`;

        if (patternRow === 3) {
            body = `Next: Row ${rowNum + 1} (Reset to Knit)`;
            title = `Pattern Row Done! 🎉`;
        }

        self.registration.showNotification('Knit Pop Tracker', {
            body: body,
            icon: 'https://cdn-icons-png.flaticon.com/512/3753/3753046.png',
            tag: 'knit-tracker-status', 
            
            // CHANGES HERE:
            silent: false,           // Must be false to appear on lock screen
            renotify: false,         // False means it won't buzz/beep when you update the row count
            requireInteraction: true // Tells Android to keep this visible
        });
    }
});
