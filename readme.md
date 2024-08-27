# LaTex + Markdown to HTML

This repository contains templates as well as scripts to convert your
LaTex + Markdown document into an HTML file. To convert it to PDF,
simply print the page from the browser.

## Getting Started

To use this tool, first clone the repository using `git`:

```bash
git clone https://github.com/gamemaker1/latex-md-to-html
cd latex-md-to-html
```

Then, install the required dependencies:

```bash
cd scripts/
npm install
cd ../
```

And finally, edit the `content/math.md` file. Once you are done, run the
`make` command and go to `http://localhost:4242/math` to see the
rendered HTML:

```bash
make
```

If you create a new file in the `content/` folder, create a template for
it in the `templates/` folder, and run the following command instead:

```bash
target=<filename> make
```

## License

This repository is licensed under the MIT license.
