const MarkdownIt = require("markdown-it");
const formatDate = require("date-fns/format");
const parseDate = require("date-fns/parse");
const { ru } = require("date-fns/locale");

module.exports = function (eleventyConfig) {
  const md = new MarkdownIt({
    html: true,
    typographer: true,
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

  eleventyConfig.addPassthroughCopy("static");
};
