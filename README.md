# DevSketch 

**A whiteboard right in your editor.** DevSketch lets you sketch, brainstorm, and diagram ideas without leaving VS Code. Perfect for when you need to think out loud—visually.

## What is This?

You know that feeling when you need to sketch out an architecture, design a workflow, or just doodle out your thoughts? DevSketch makes that frictionless by putting a whiteboard directly in VS Code's sidebar. No context-switching, no opening random tools—just draw.

Whether you're drafting a system diagram, wireframing a UI, or just taking notes, it's all right there next to your code.

## Getting Started

### Install It

- Open VS Code → Extensions (`Ctrl+Shift+X`)
- Search for **DevSketch**
- Click Install

### Open the Whiteboard

Three ways to get drawing:

1. **Click the DevSketch icon** in the activity bar on the left
2. **Hit Ctrl+Shift+P** and type "DevSketch: Open Whiteboard"
3. **Look in your sidebar** — DevSketch view is always there

Then just start drawing.

## Requirements

- VS Code 1.118.0 or newer

## How It Works

Open DevSketch → draw on the canvas → your sketch stays there while you code. Flip back to your sketch whenever you need it. Simple as that.

## Building Locally

Want to mess with the code? Here's what you need:

```bash
# Get dependencies
npm install

# Compile everything
npm run compile

# Or watch for changes while you develop
npm run watch

# Run the tests
npm test

# Build for release
npm run package
```

### The Structure

```
devsketch/
├── src/          # Extension code (TypeScript)
├── webview/      # React drawing interface
├── media/        # Icons
└── package.json  # Config
```

### Useful Commands

- `npm run watch` — Auto-rebuilds as you change code
- `npm run lint` — Check for code issues
- `npm run check-types` — TypeScript validation
- `npm run webview:build` — Just rebuild the UI

## Extension Settings

This extension contributes the following to VS Code:

**Commands:**
What's Next?

Some ideas we're thinking about:

- Save and export your sketches
- More drawing tools (shapes, colors, text)
- Undo/Redo
- Share sketches with teammates
- Light and dark themes

## Bugs or Ideas?

Found something broken? Have a feature request? [Open an issue](https://github.com/) — we read everything.

## Contributing

Got code? We'd love a PR. Found a bug? Tell us. Have an idea? Drop it in an issue.

## License

MIT. Use it however you want.

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

