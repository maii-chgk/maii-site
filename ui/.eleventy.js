const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addPairedShortcode("markdown", (content) =>
    md.render(content)
  );
};
