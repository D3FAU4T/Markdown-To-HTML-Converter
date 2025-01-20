import { marked } from "marked";
import { basename } from "path";

const path = process.argv[2];
if (!path) {
    console.error(`Please provide a path to the markdown file\n\nExample:\nbun run index.ts ./readme.md`);
    process.exit(1);
}

const htmlFile = await Bun.file('./src/index.html').text();
const cssFile = await Bun.file('./src/style.css').text();
const data = await Bun.file(path).text();
const getTitle = (str: string) => str.split('\n')[0].replace(/^#+(\s+)?/g, '');

const fileName = basename(path);

let markdown = htmlFile
.replace(/{{D3-WEBPAGETITLE}}/g, fileName)
.replace('/*D3-CSSSTYLE*/', cssFile)
.replace(/{{D3-TITLE}}/g, getTitle(data))
.replace('{{D3-MARKDOWN}}', await marked(data.split('\n').slice(1).join('\n')));

const outName = fileName.replace('.md', '.html');
await Bun.write(`./dist/${outName}`, markdown);
console.log(`File Live Link: ${encodeURI('http://127.0.0.1:3000/dist/' + outName)}`);
console.log('Execution complete');
