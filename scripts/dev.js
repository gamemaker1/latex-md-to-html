// scripts/dev.js
// serves the compiled html files

import fetch from 'got'
import chalk from 'chalk'
import handler from 'serve-handler'

import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { copy } from 'fs-extra'

const error = chalk.inverse.red(' error ')
const success = chalk.green(' success ')
const info = chalk.cyan(' info    ')

const port = 4242
const outputDirectory = './build'

process.on('exit', () => console.log())
console.log('\n' + chalk.inverse.magenta(' build ') + '\n')

const file = process.argv.slice(2)[0]
if (!file) {
	console.log(error, 'specify a file to compile')
	process.exit(1)
}

const markdown = await readFile(`./content/${file}.md`, 'utf-8')
const template = await readFile(`./templates/${file}.html`, 'utf-8')

const html = await fetch('https://api.github.com/markdown', {
	method: 'post',
	json: { text: markdown },
}).text()

const build = template.replace('{content}', html)
await writeFile(`${outputDirectory}/${file}.html`, build)
await copy('./content/static', `${outputDirectory}/static`)

console.log(success, `compiled ${file}`)

const server = createServer((request, response) => {
	return handler(request, response, {
		cleanUrls: true,
		public: outputDirectory,
	})
})

server.listen(port, () => {
	console.log(info, `hosted at http://localhost:${port}`)
})
