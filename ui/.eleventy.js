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
