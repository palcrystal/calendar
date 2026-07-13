const CACHE_NAME = 'calendar-app-v1';
// オフラインでも開きたいファイルをここにリストアップします
const ASSETS = [
  './',
  './index.html',
  './icon.png' // もしCSSや別のJSファイルがあればここに追加します
];

// インストール時にファイルをスマホに保存（キャッシュ）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// オフライン時はスマホに保存したファイルから画面を表示
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
