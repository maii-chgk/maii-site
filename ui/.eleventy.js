const MarkdownIt = require("markdown-it");
const formatDate = require("date-fns/format");
const parseDate = require("date-fns/parse");
const { ru } = require("date-fns/locale");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

const isDev = process.env.NODE_ENV !== "production";

module.exports = function (eleventyConfig) {
  const md = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
  });

  eleventyConfig.addFilter("json", (obj) => {
    return JSON.stringify(obj);
  });

  eleventyConfig.addFilter("take", (arr, count) => {
    return arr.slice(0, count);
  });

  eleventyConfig.addFilter("sortNames", (arr, attr) => {
    arr = arr.map((o) => [attr ? o[attr] : o, o]);
    return arr
      .map(([k, o]) => [k.split(/\s+/).reverse().join(" "), o])
      .sort()
      .map(([_, o]) => o);
  });

  const cmp = (spec) => (a, b) => {
    a = a[spec[0]];
    b = b[spec[0]];

    if (a === b) {
      return 0;
    }

    return spec[1] ? (b < a ? -1 : 1) : a < b ? -1 : 1;
  };

  eleventyConfig.addFilter("sortMultiple", (arr, specs) => {
    specs = specs.map((spec) => (Array.isArray(spec) ? spec : [spec, false]));
    return arr.sort((a, b) => {
      for (const spec of specs) {
        const res = cmp(spec)(a, b);
        if (res !== 0) {
          return res;
        }
      }
      return 0;
    });
  });

  eleventyConfig.addFilter("date", (date, format = "dd.MM.yyyy") => {
    return formatDate(parseDate(date, "yyyy-MM-dd", new Date()), format, {
      locale: ru,
    });
  });

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  if (isDev) {
    // in build we copy the files before the 11ty build
    // it's require for the cache busting plugin to work reliably
    eleventyConfig.addPassthroughCopy("static");
  }

  eleventyConfig.addPlugin(cacheBuster({}));
};
