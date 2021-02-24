const MarkdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  const md = new MarkdownIt({
    html: true,
    typographer: true,
  });

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  eleventyConfig.addPassthroughCopy("static");
};
