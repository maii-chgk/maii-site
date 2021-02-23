const zlib = require("zlib");

module.expots = {
  gzip: {
    enabled: true,
    options: {
      br: {
        params: {
          [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
          [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
        },
      },
    },
  },
};
