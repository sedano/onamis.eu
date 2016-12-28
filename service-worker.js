/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/beta.html","7d86671aa0c4f82a585714e3071a1339"],["/css/new-age.css","4ca2850ea0993b734bb340a6d716208a"],["/css/new-age.min.css","6483c78e92dd91def6ca4b9e110987dc"],["/img/app-store-badge.svg","1cfd5dba4a9210bcf77f5dbe48ec2e66"],["/img/bg-cta.jpg","36ddbb2de498313fdacd1b2a64eb8363"],["/img/bg-pattern.png","3c6467278a66af3216348e8588a69062"],["/img/demo-screen-1.jpg","82bcf3c843c811de878424e8d8307250"],["/img/google-play-badge.svg","cfea2442b66fe18c84e0f51c29486192"],["/img/icons/android-chrome-192x192.png","4f5c2b68a72765e94a993e3a44a1277a"],["/img/icons/android-chrome-512x512.png","7ed9d450af7536416e37cc23067cbc55"],["/img/icons/apple-touch-icon-precomposed.png","8edabf3c044749de97a7c313fd036769"],["/img/icons/apple-touch-icon.png","3a52a909af0d20c69656d518993cf7d6"],["/img/icons/favicon-16x16.png","b4a8cd753da017048c98edf1ed2fd29b"],["/img/icons/favicon-32x32.png","e8f7e1dd7ea0fc4240d914d41c8e4151"],["/img/icons/mstile-144x144.png","2d30b4688228a8ad1d1c1065f1b396b1"],["/img/icons/mstile-150x150.png","7cb959164250ede40ae13ed1816dbf1d"],["/img/icons/mstile-310x150.png","0778b272e9107ba62f9bb82bd6b73975"],["/img/icons/mstile-310x310.png","2ec5a8eecf37c5bef13bca759f6983e6"],["/img/icons/mstile-70x70.png","0f934579273af3b432da68910e5217c0"],["/img/icons/safari-pinned-tab.svg","e3dae9e3888f434529be1b30727bfdf6"],["/img/logo.svg","dbf6bdea2a2c74f080fdd38991124bec"],["/img/logo_mini.svg","fa594f874a2d59b2d9a58a89f1581f44"],["/img/marker.png","6dc24f57af65ecc7ea5d6206279af8b5"],["/img/onamis.herokuapp.com-(iPhone 6 Plus).png","d0f642498efe0d4ca8c96ca5164055bd"],["/img/onamis.png","71ef7bc60d1a948aa0f232acbf88068e"],["/index.html","68caa413b218bb0bd39b5d49b33a23c8"],["/js/new-age.js","26c18b76f017fe1a2e07def9fb30b88d"],["/js/new-age.min.js","b923892edd8bb611bc1568407831ac92"],["/lib/bootstrap/css/bootstrap.css","2a31dca112f26923b51676cb764c58d5"],["/lib/bootstrap/css/bootstrap.min.css","ec3bb52a00e176a7181d454dffaea219"],["/lib/bootstrap/fonts/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["/lib/bootstrap/fonts/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/lib/bootstrap/fonts/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["/lib/bootstrap/fonts/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["/lib/bootstrap/js/bootstrap.js","fb81549ee2896513a1ed5714b1b1a0f0"],["/lib/bootstrap/js/bootstrap.min.js","5869c96cc8f19086aee625d670d741f9"],["/lib/device-mockups/device-mockups.css","e86034f09471a26e426ecdd71dd63a37"],["/lib/device-mockups/device-mockups.min.css","32aaa2b8e71c171f3d424db8b7945492"],["/lib/device-mockups/device-mockups2.css","740b41b1a79b375b124a27fe064e643a"],["/lib/device-mockups/device-mockups2.min.css","693d8281af09371f5b90f81e5284e860"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_black_land.png","ae1f5e7ab3d5a28ac3a858de6764f7df"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_black_port.png","d96cfb83c4d774edd86e0e06b47a974b"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_gold_land.png","b8846e1c45561164e04a43abc5a5c75a"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_gold_port.png","0aec69baa3d9026b3dd7dd88e054f35e"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_white_land.png","3b0218f7b660c875ec8440fd9279df00"],["/lib/device-mockups/iphone_6_plus/iphone_6_plus_white_port.png","d6c50fbd2ce470c075e863ba6961557a"],["/lib/font-awesome/css/font-awesome.css","c495654869785bc3df60216616814ad1"],["/lib/font-awesome/css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/jquery.js","fb2d334dabf4902825df4fe6c2298b4b"],["/lib/jquery/jquery.min.js","4f252523d4af0b478c810c2547a63e19"],["/lib/particles/particles.js","f10f10368bb1407fe7a0b392952ee5ab"],["/lib/particles/particles.min.js","465616f6a6d2da0aa574534503b70fa6"],["/lib/particles/particlesjs-config-xmas.json","2fe1aaf36594ed90e1fa2602777cf37a"],["/lib/particles/particlesjs-config.json","386d159a3ecb0aa742caa67844eedf5a"],["/lib/simple-line-icons/css/simple-line-icons.css","093ca662394ed698fdb5835e425d28dd"],["/lib/simple-line-icons/fonts/Simple-Line-Icons.eot","f33df365d6d0255b586f2920355e94d7"],["/lib/simple-line-icons/fonts/Simple-Line-Icons.svg","2fe2efe63441d830b1acd106c1fe8734"],["/lib/simple-line-icons/fonts/Simple-Line-Icons.ttf","d2285965fe34b05465047401b8595dd0"],["/lib/simple-line-icons/fonts/Simple-Line-Icons.woff","78f07e2c2a535c26ef21d95e41bd7175"],["/lib/simple-line-icons/fonts/Simple-Line-Icons.woff2","0cb0b9c589c0624c9c78dd3d83e946f6"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/./];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







