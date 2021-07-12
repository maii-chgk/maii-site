module.exports = {
  globDirectory: "_site/",
  globPatterns: ["**/*.{html,png,ico,svg,jpg,jpeg,css,js}"],
  swDest: "_site/sw.js",
  directoryIndex: "index.html",
  skipWaiting: true,

  runtimeCaching: [
    {
      urlPattern: /\.html$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "html",
        expiration: {
          maxEntries: 20,
        },
      },
    },
    {
      urlPattern: /\/$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "html",
        expiration: {
          maxEntries: 20,
        },
      },
    },
    {
      urlPattern: /\.(?:css|js)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "code",
        expiration: {
          maxEntries: 20,
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 20,
        },
      },
    },
  ],
};
