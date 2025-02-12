import { marked } from "marked";
import { basename } from "path";

const path = process.argv[2];
if (!path) {
    console.error(`Please provide a path to the markdown file\n\nExample:\nbun run index.ts ./readme.md`);
    process.exit(1);
}

const HTMLSuite = {
    baseFile: await Bun.file('./src/index.html').text(),
    fileName: basename(path),
    css: await Bun.file('./src/style.css').text(),
    data: await Bun.file(path).text()
}

const replacePlaceholders = async () => {
    return HTMLSuite.baseFile
    .replace(/{{D3-WEBPAGETITLE}}/g, HTMLSuite.fileName)
    .replace('/*D3-CSSSTYLE*/', HTMLSuite.css)
    .replace(/{{D3-TITLE}}/g, HTMLSuite.data.split('\n')[0].replace(/^#+(\s+)?/g, ''))
    .replace('{{D3-MARKDOWN}}', await marked(HTMLSuite.data.split('\n').slice(1).join('\n')))
}

const html = await replacePlaceholders();

const outName = HTMLSuite.fileName.replace('.md', '.html');
await Bun.write(`./dist/${outName}`, html);
console.log(`File Live Link: ${encodeURI('http://127.0.0.1:3000/dist/' + outName)}`);
console.log('Execution complete');
