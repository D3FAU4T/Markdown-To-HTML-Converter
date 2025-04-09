import { marked } from "marked";
import markedKatex from "marked-katex-extension";

marked.use(markedKatex({
    output: "mathml"
}));

type contentsType = {
    title: string;
    content: string;
}

const getTitle = (str: string) => str.split('\n')[0]?.replace(/^#+(\s+)?/g, '');

const contents: contentsType[] = await Promise.all(process.argv.slice(2).map(async filePath => {
    const file = Bun.file(filePath);
    const data = await file.text();
    const title = getTitle(data) ?? '';
    const content = await marked(data.split('\n').slice(1).join('\n'));

    return { title, content };
}));

const htmlFile = await Bun.file('./src/index.html').text();
const cssFile = await Bun.file('./src/style.css').text();

const markdown = htmlFile
    .replace(/{{D3-WEBPAGETITLE}}/g, 'Made by D3FAU4T (14542723127)')
    .replace(/{{D3-TITLE}}/g, contents[0]!.title)
    .replace('/*D3-CSSSTYLE*/', cssFile)
    .replace(/{{D3-MARKDOWN}}/g, contents.map(c => `<section class="scrollbar-wrapper" id="content-${c.title}">${c.content}</section>`).join('\n'));

await Bun.write('./dist/index.html', markdown);