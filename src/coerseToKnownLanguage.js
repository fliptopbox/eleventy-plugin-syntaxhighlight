const prismComponents = require("prismjs/components.json");
const glossary = prismLanguageKeys(prismComponents);

// Create a simple array of all Prism languages
//
function prismLanguageKeys ({languages}) {
  return [].concat.apply([], Object.entries(languages)
    .map(([key, value]) => {
      const alias = value.alias ? value.alias : [];
      const aliases = alias && typeof alias === "string" ? [alias] : alias;
      return [ key, ...aliases ];
    }));
}

module.exports = function coerseToKnownLanguage (original, extended) {
  const language = original.toLowerCase().replace(/[^a-z0-9\-]+/g, "");
  let index = glossary.indexOf(language);

  if (index + 1) return language;

  const customHash = extended && typeof extended === "object" ? extended : {};
  const map = { ...customHash };
  const key = map[language] || null;

  index = glossary.indexOf(key);
  const candidate = index + 1 ? glossary[index] : "text";

  console.log("> highlight: coerse [%s] to [%s]", language, candidate);
  return candidate;
}
