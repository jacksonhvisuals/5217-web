importScripts("precache-manifest.4454d6cd583d24af66b580063ec97b14.js", "workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});
if (!workbox) {
  console.log('Service Worker - Failed to load Workbox');
}

workbox.googleAnalytics.initialize();

function matchURL(conditions, options = {}) {
  const currentOrigin = location.origin,
        sameOrigin = typeof options.sameOrigin === 'undefined' ? true : options.sameOrigin,
        acceptIndex = typeof options.acceptIndex === 'undefined' ? false : options.acceptIndex;
  return function({url, event}) {
    if (sameOrigin && url.origin !== currentOrigin) {
      return false;
    } else if (acceptIndex && url.origin === currentOrigin &&
      (url.pathname === '' || url.pathname === '/')) {
      return true;
    } else if (sameOrigin && url.origin === currentOrigin) {
      let matched = false;
      conditions.forEach(condition => {
        if (!condition instanceof RegExp) condition = new RegExp(condition);
        if (condition.test(url.href)) {
          matched = true;
          return;
        }
      });
      return matched;
    } else if (!sameOrigin) {
      let matched = false;
      conditions.forEach(condition => {
        if ((condition instanceof RegExp && condition.test(url.href))
          || (!(condition instanceof RegExp) && url.href.search(condition.toString()) !== -1)) {
          matched = true;
          return;
        }
      });
      return matched;
    } else return false;
  }
}

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const cacheStrategy = new workbox.strategies.CacheFirst({
  cacheName: 'unmutable-cache',
  plugins: [ new workbox.expiration.Plugin({
    maxAgeSeconds: 60 * 60 * 24 * 30 * 12 // 1 year
  }) ]
});

// All local routes are unmutable so cache forever
workbox.routing.registerRoute(
  matchURL([/.*/], { acceptIndex: true, sameOrigin: true }),
  cacheStrategy.handle.bind(cacheStrategy) //this will be fixed in v5, see https://github.com/GoogleChrome/workbox/issues/2180
);

