const { default: axios } = require("axios");
const fm = require("front-matter");

const langs = ["ru", "de"];

const langNames = {
  ru: "Русский",
  de: "Deutsch",
};

const url = (lang) =>
  `https://raw.githubusercontent.com/razumau/statute_templating/main/statute.${lang}.md`;

module.exports = async () => {
  let texts = await Promise.all(
    langs.map(async (lang) => {
      const { data } = await axios.get(url(lang));
      const { attributes, body } = fm(data);
      return { ...attributes, body };
    })
  );
  texts = langs.map((lang, i) => ({ lang, ...texts[i] }));
  return {
    texts,
    defaultLang: langs[0],
    langNames,
  };
};
