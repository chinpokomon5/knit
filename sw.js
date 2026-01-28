// sw.js
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    return self.clients.claim();
});

// Listen for messages from the main app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_ROW') {
        const rowNum = event.data.row;
        const patternRow = (rowNum - 1) % 3 + 1;
        
        let title = `Row ${rowNum} Complete`;
        let body = `Next: Row ${rowNum + 1} (Pattern Row ${patternRow})`;

        // Customize message for the "Pattern" row (Row 3)
        if (patternRow === 3) {
            body = `Next: Row ${rowNum + 1} (Reset to Knit)`;
            title = `Pattern Row Done! 🎉`;
        }

        // Show or update the notification
        // Using the same 'tag' ensures we update the existing notification
        // instead of creating a new one every time.
        self.registration.showNotification('Knit Pop Tracker', {
            body: body,
            icon: 'https://cdn-icons-png.flaticon.com/512/3753/3753046.png', // Generic yarn icon
            tag: 'knit-tracker-status', 
            renotify: false, // Set to true if you want it to vibrate every time
            silent: true     // Keep it quiet so it doesn't annoy the user
        });
    }
});
