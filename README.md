# Markdown to HTML Converter

This project converts Markdown files into a styled HTML webpage. It uses `Bun` as the runtime and `marked` for parsing Markdown into HTML. The generated HTML includes a navigation sidebar, theme controls, and syntax highlighting for code blocks.

## Installation

To install dependencies, run:

```bash
bun install
```

## Usage

To convert Markdown files to HTML, run:

```bash
bun run index.ts <path-to-markdown-files>
```

The converted HTML will be saved in the `dist/index.html` file.

## Project Structure

- `index.ts`: Main script for converting Markdown to HTML.
- `src/index.html`: Template HTML file used for generating the final output.
- `src/style.css`: CSS file for styling the generated HTML.
- `markdown/`: Directory containing sample Markdown files.
- `dist/`: Directory where the generated HTML file is saved.

## Special Features

### CSS Classes

The following CSS classes are used in the Markdown to enhance the generated HTML:

- **`color-accent`**: Adds a primary color to text elements.
- **`summary`**: Used to mark headings that should appear in the sidebar. Requires a `data-summary` attribute to specify the text to display in the sidebar.
- **`omit-second-col`**: Hides the second column in tables.
- **`landscape-only`**: Displays elements only in landscape orientation.
- **`portrait-only`**: Displays elements only in portrait orientation.

Example:

```html
<h2 class="color-accent summary" data-summary="Different types of SQL commands" id="sql_types">SQL Types and Commands</h2>

<div class="omit-second-col">

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

</div>

<div class="landscape-only">This content is visible only in landscape mode.</div>
<div class="portrait-only">This content is visible only in portrait mode.</div>
```

### Sidebar Summaries

To make a heading appear in the sidebar, add the `summary` class and a `data-summary` attribute to the heading. The `data-summary` attribute specifies the text to display in the sidebar, and the `id` attribute is used for navigation.

Example:

```html
<h2 class="summary" data-summary="Using the INSERT command" id="sql_insert">INSERT INTO Command</h2>
```

### Theme Controls

The generated HTML includes theme controls for switching between light and dark modes. The primary color can also be adjusted using a hue slider.

### Syntax Highlighting

Code blocks in the Markdown are automatically highlighted using `highlight.js`. The language of the code block is displayed above the block if specified in the Markdown.

## Development

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
