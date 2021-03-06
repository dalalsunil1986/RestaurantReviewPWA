const staticCacheName = 'restaurant-review-static-v4';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then((cache) => 
                cache.addAll([
                    'css/styles.css',
                    'js/idb.js',
                    'js/dbhelper.js',
                    'js/main.js',
                    'js/restaurant_info.js',
                    'img/1.jpg',
                    'img/2.jpg',
                    'img/3.jpg',
                    'img/4.jpg',
                    'img/5.jpg',
                    'img/6.jpg',
                    'img/7.jpg',
                    'img/8.jpg',
                    'img/9.jpg',
                    'img/10.jpg',
                ])
            )
    );
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName.startsWith('restaurant-review' && cacheName != staticCacheName);
                }).map((cacheName) => caches.delete(cacheName))
            )
        )
    )
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) return response;
                return fetch(event.request)
            })
    )
})