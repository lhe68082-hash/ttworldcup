const CACHE_NAME = 'wc2026-v13';
const OFFLINE_URL = '/';

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/data.js',
  '/keys.js',
  '/live-client.js',
  '/match-registry.js',
  '/lottery-api.js',
  '/manifest.json'
];

// 安装：缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] 缓存打开成功');
      return cache.addAll(urlsToCache).catch(err => {
        console.warn('[SW] 部分资源缓存失败:', err);
      });
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 请求拦截：HTML/JS/CSS 网络优先保证更新，其他资源缓存优先
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);
  const isCode = /\.(js|css|html?)$/.test(url.pathname) || event.request.mode === 'navigate';

  if (isCode) {
    // 网络优先：确保总是获取最新版本
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // 网络失败时回退到缓存
        return caches.match(event.request);
      })
    );
  } else {
    // 缓存优先：图片、字体等静态资源
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return networkResponse;
        });
      })
    );
  }
});

// 推送通知（预留）
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || '世界杯助手有新消息！',
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '查看' },
      { action: 'close', title: '忽略' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || '🏆 世界杯助手', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
