const { wordList } = require("random-words");
const shell = require("shelljs");
const axios = require("axios");
const fs = require("fs");

console.log(wordList.length);

(async () => {
  const data = await Promise.all(
    wordList.map(async (word) => {
      try {
        const result = await axios.get(
          `https://api.npms.io/v2/package/${word}`
        );
        return [word, result.data.collected.metadata.description];
      } catch (e) {
        return [word, null];
      }
    })
  );
  fs.writeFileSync('output.json', JSON.stringify(data), 'utf8')
})();
