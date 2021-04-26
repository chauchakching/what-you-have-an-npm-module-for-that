const fs = require("fs");

const data = JSON.parse(fs.readFileSync("output.json", "utf8"));
const filteredData = data.filter(([_, description]) => !!description)

const text = `
## What? You have an npm package for that?

A list of npm modules named with a common word.

Total: \`${filteredData.length}\`

${filteredData
  .map(([word, description]) => {
    if (!description) {
      return `${word} - NOT TAKEN YET`;
    }
    return `### # ${word} [![Version](https://img.shields.io/npm/dm/${word}.svg)](https://www.npmjs.com/package/${word})\n\n${description}`;
  })
  .join("\n\n")}
`;

fs.writeFileSync("README.md", text, "utf8");
