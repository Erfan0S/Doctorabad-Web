if (!self.define) {
  let e,
    a = {};
  const s = (s, n) => (
    (s = new URL(s + ".js", n).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, c) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[t]) return;
    let i = {};
    const r = (e) => s(e, t),
      l = { module: { uri: t }, exports: i, require: r };
    a[t] = Promise.all(n.map((e) => l[e] || r(e))).then((e) => (c(...e), i));
  };
}
define(["./workbox-495fd258"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/learn/_next/app-build-manifest.json",
          revision: "c7d69f7cfe2799ff1ff9a665e6b3e5a6",
        },
        {
          url: "/learn/_next/static/chunks/1528-31a9940853eaf215.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/1dd3208c-7acc6b2563fd2033.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/2829-38288b0dcb5202ea.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/2849449d-0a5a744900475026.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/3dd24a63-53939a19d9c24c8d.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/4114-c2495c934626c955.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/4453-568a09e444914f2f.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/5653-d0ad34d42a9b9a27.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/6834-a351da6a622ba967.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/7333.7b1a3509bd933195.js",
          revision: "7b1a3509bd933195",
        },
        {
          url: "/learn/_next/static/chunks/7376-dd448f3dffbabde5.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/7900-fe3cb19f7d05099e.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/8329-4f3bc4d57b16f4d7.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/8995-803474640f11b7ca.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/9556-eb2de1afbf8172a5.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/9692.a8d55b185a8fc44d.js",
          revision: "a8d55b185a8fc44d",
        },
        {
          url: "/learn/_next/static/chunks/a91d8edb.9d3b3b7641e70789.js",
          revision: "9d3b3b7641e70789",
        },
        {
          url: "/learn/_next/static/chunks/aead1a64.7458c04795e208bc.js",
          revision: "7458c04795e208bc",
        },
        {
          url: "/learn/_next/static/chunks/app/_not-found/page-b5a01aec9dfbca98.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/callback/layout-b34bd9785d0fcd10.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/callback/page-ca1b6d6fc8d6a733.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/categories/%5Bid%5D/%5B...name%5D/page-baa93567dad14657.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/categories/page-96c268d96c4ea6bf.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/checkout/layout-9e5454130b251a0a.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/checkout/page-6aa7c69efe648ed0.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/course/%5Bid%5D/%5B%5B...slug%5D%5D/layout-0da2ff592679d291.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/course/%5Bid%5D/%5B%5B...slug%5D%5D/page-94b7edebe8495bd5.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/course_list/%5Btype%5D/page-7120a6e71cc9cd86.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/error-233e8a02201f1f6c.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/filter/page-552d7fdab3216da6.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/layout-8cf2abd9da61fc2b.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/my_course/layout-b20b8bdf7db1fc81.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/my_course/page-6aeae04548cb6ffb.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/not-found-68f2652f81b3fedb.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/page-83e36b7a256d01f6.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/providers/%5Bid%5D/layout-d465f448b9e65b82.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/providers/%5Bid%5D/page-d15f461608fdf364.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/providers/page-65d6838ed3cf02d0.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/register/page-583605bed49c9d89.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/app/search/page-dcf49b7e713cc739.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/df56de66.09325fc30978b8b8.js",
          revision: "09325fc30978b8b8",
        },
        {
          url: "/learn/_next/static/chunks/framework-4691e0e0071210f8.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/main-0d8588444a60243b.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/main-app-6db7571b594f5683.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/pages/_app-475e7e1ea3b2c234.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/pages/_error-5558af2983b90ceb.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/learn/_next/static/chunks/webpack-c0c2fc5a7e63c74d.js",
          revision: "ySYHMpH-Ntq8b0HOOIIcI",
        },
        {
          url: "/learn/_next/static/css/0595d7b4047afdcf.css",
          revision: "0595d7b4047afdcf",
        },
        {
          url: "/learn/_next/static/css/0651915aaa5fe2bd.css",
          revision: "0651915aaa5fe2bd",
        },
        {
          url: "/learn/_next/static/css/269839e2d09b4ee0.css",
          revision: "269839e2d09b4ee0",
        },
        {
          url: "/learn/_next/static/css/2e3ed7c29f36b2bf.css",
          revision: "2e3ed7c29f36b2bf",
        },
        {
          url: "/learn/_next/static/css/3d13c960ef5e3c6b.css",
          revision: "3d13c960ef5e3c6b",
        },
        {
          url: "/learn/_next/static/css/4af149c5392b75e9.css",
          revision: "4af149c5392b75e9",
        },
        {
          url: "/learn/_next/static/css/4cbef2e408014d94.css",
          revision: "4cbef2e408014d94",
        },
        {
          url: "/learn/_next/static/css/53c8e4dee2f71c9c.css",
          revision: "53c8e4dee2f71c9c",
        },
        {
          url: "/learn/_next/static/css/5944ec4566224f83.css",
          revision: "5944ec4566224f83",
        },
        {
          url: "/learn/_next/static/css/5a158a3459cb9b22.css",
          revision: "5a158a3459cb9b22",
        },
        {
          url: "/learn/_next/static/css/5dcf13ac855554f2.css",
          revision: "5dcf13ac855554f2",
        },
        {
          url: "/learn/_next/static/css/6d269122667ee081.css",
          revision: "6d269122667ee081",
        },
        {
          url: "/learn/_next/static/css/76079285646713a5.css",
          revision: "76079285646713a5",
        },
        {
          url: "/learn/_next/static/css/c5ee19db01ec2d1c.css",
          revision: "c5ee19db01ec2d1c",
        },
        {
          url: "/learn/_next/static/css/c8e2866a9d55d220.css",
          revision: "c8e2866a9d55d220",
        },
        {
          url: "/learn/_next/static/css/ca06e93a2643592c.css",
          revision: "ca06e93a2643592c",
        },
        {
          url: "/learn/_next/static/css/d9e19f9e634ac37b.css",
          revision: "d9e19f9e634ac37b",
        },
        {
          url: "/learn/_next/static/css/f639cf6e058429c1.css",
          revision: "f639cf6e058429c1",
        },
        {
          url: "/learn/_next/static/media/01.1f7232b2.png",
          revision: "bc400b29655d3245e4344f2083c19301",
        },
        {
          url: "/learn/_next/static/media/01.caeaf886.png",
          revision: "a8d3023769757e9d76a886345d46492d",
        },
        {
          url: "/learn/_next/static/media/02.3f3cf0f2.png",
          revision: "7107c60d29372dc35f60299b81297fb7",
        },
        {
          url: "/learn/_next/static/media/03.9a157b96.png",
          revision: "1c5a45f5178538b0c3f346bdb082ba22",
        },
        {
          url: "/learn/_next/static/media/04.7ed769fb.png",
          revision: "342804199fdd4c25e30b871781bedac6",
        },
        {
          url: "/learn/_next/static/media/05.45785916.png",
          revision: "6a4ce76fdbc41de600b53e2ba6710573",
        },
        {
          url: "/learn/_next/static/media/06.c59f5fe9.png",
          revision: "3abe862ec0b7a1ffd5a96601cf5a5fd5",
        },
        {
          url: "/learn/_next/static/media/07.7b1259ec.png",
          revision: "9413d033e7477c289122f33f3f2a29cc",
        },
        {
          url: "/learn/_next/static/media/08.080de12e.png",
          revision: "016eae34c9097d9043d6be0f48536dab",
        },
        {
          url: "/learn/_next/static/media/09.29aa26f2.png",
          revision: "d034d9e701e3a98e7b556407b5b0a261",
        },
        {
          url: "/learn/_next/static/media/10.bc70a376.png",
          revision: "acaa530a79a014cccdb91f12c3f278a2",
        },
        {
          url: "/learn/_next/static/media/1fb34ecfad6f58d1-s.p.woff2",
          revision: "ae28d8b1559ff0258d968d0418acce7e",
        },
        {
          url: "/learn/_next/static/media/KADKHODA.0225d5cd.png",
          revision: "4aefed9ad67045c4eb2815905bcf298d",
        },
        {
          url: "/learn/_next/static/media/club.20eb5095.png",
          revision: "a82e187feeac1c8831380eea8bac2907",
        },
        {
          url: "/learn/_next/static/media/coin.522f96fd.png",
          revision: "2c07ad48a4259a91c83c9b2c5b796392",
        },
        {
          url: "/learn/_next/static/media/coins.95227212.png",
          revision: "bd80d8612f1ce5528797e6c788df9f40",
        },
        {
          url: "/learn/_next/static/media/d1.0fe9184b.jpg",
          revision: "52916c23ede00f22f0caf451a3f26827",
        },
        {
          url: "/learn/_next/static/media/d2.8c32d7a1.jpg",
          revision: "f06646f94daf9fed189dd5fa1e7810f4",
        },
        {
          url: "/learn/_next/static/media/d3.f42aff63.jpg",
          revision: "d8574793f467475b66777103d8f4e904",
        },
        {
          url: "/learn/_next/static/media/doctor-download.935337d9.png",
          revision: "9a34596d39b36d6085975f7c3227beae",
        },
        {
          url: "/learn/_next/static/media/doctor-exam.97f3c106.png",
          revision: "ffa5961868fde33fb84cc5a0fd8aa79f",
        },
        {
          url: "/learn/_next/static/media/doctor-learn.cbaec33f.png",
          revision: "9b750b33d1128290e56cc588e8fe8bb1",
        },
        {
          url: "/learn/_next/static/media/doctor-market.8f619f5e.png",
          revision: "0ec8229d9ca29230beaa0ecf6cb19b32",
        },
        {
          url: "/learn/_next/static/media/doctor-tools.d6ba5d95.png",
          revision: "e39c91bb8f4a42fad3314965accbffae",
        },
        {
          url: "/learn/_next/static/media/login.da30b526.jpg",
          revision: "4c60298105df9713b25ce0899077a652",
        },
        {
          url: "/learn/_next/static/media/logo-doctor-abad.a24f2338.png",
          revision: "af6bc7c2c64d3b0869d6fc6373fe40d2",
        },
        {
          url: "/learn/_next/static/media/logo-type.c5675564.png",
          revision: "e7dff2513b6f2c0faa9e17b74f9c604c",
        },
        {
          url: "/learn/_next/static/media/logo-without-text.4340e4d4.png",
          revision: "1fd057935404088ea0b0795ebf3b0789",
        },
        {
          url: "/learn/_next/static/media/logo.78b8c2e7.png",
          revision: "4a263c49dff91741cc7f15537e9d0455",
        },
        {
          url: "/learn/_next/static/media/play.ebbaafdd.svg",
          revision: "ebbaafdd",
        },
        {
          url: "/learn/_next/static/ySYHMpH-Ntq8b0HOOIIcI/_buildManifest.js",
          revision: "59f235426651559794569efc4bc99153",
        },
        {
          url: "/learn/_next/static/ySYHMpH-Ntq8b0HOOIIcI/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/learn/icon_144.png",
          revision: "699bd745376a72e648107c4e4ff40fcb",
        },
        {
          url: "/learn/icon_192.png",
          revision: "06a907e163b0fb2062fcb05d462a7e55",
        },
        {
          url: "/learn/icon_384.png",
          revision: "36fc9a5880e905b9f56fd8fa9ca0d400",
        },
        {
          url: "/learn/icon_48.png",
          revision: "2e1b8d811262b1f3873948e109a3e4ae",
        },
        {
          url: "/learn/icon_512.png",
          revision: "36fc9a5880e905b9f56fd8fa9ca0d400",
        },
        {
          url: "/learn/icon_72.png",
          revision: "0b720a1179b7f127201b58b820348566",
        },
        {
          url: "/learn/icon_96.png",
          revision: "527cc63c9b0e1a7ce53a0a45dc8bf50a",
        },
        {
          url: "/learn/manifest.webmanifest",
          revision: "30b10e84c42597258d9c52b2905962ce",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/learn",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: s,
              state: n,
            }) =>
              a && "opaqueredirect" === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: "OK",
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith("/api/auth/") && !!a.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
