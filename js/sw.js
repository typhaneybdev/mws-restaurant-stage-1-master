
//https://www.youtube.com/watch?time_continue=701&v=ksXwaWHCW6k walkthrough with Traversy Media 8/3/18 & https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/ Matthew Cranford Walkthrough 9/1 & Doug Brown https://www.youtube.com/watch?v=92dtrNU1GQc
//call install event
const cacheID = 'Restaurant Reviews';
//Cache an array of files
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];

self.addEventListener('install', function(e) { // listen for service worker install and cache array of assets
  e.waitUntil(
    caches.open(cacheID).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers fire fetch event everytime resource controlled by service worker is fetched
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open('cacheFiles').then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
    .catch(function(err) {
      console.log(err);
    })
  );
});
