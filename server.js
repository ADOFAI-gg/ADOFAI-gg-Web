import { handler } from './build/handler.js'
import axios from 'axios'

import express from 'express'
import compression from 'compression'
import sharp from 'sharp'

const app = express()

app.get('/healthcheck', (_req, res) => {
	res.send('ok')
})

app.use(compression())

app.use((req, res, next) => {
	if (req.path.startsWith('/_app/immutable/') || req.path === '/background.webp') {
		res.header('cache-control', 'max-age=31536000')
	} else if (req.path.startsWith('/fonts/')) {
		res.header('cache-control', 'max-age=31536000')
	}

	next()
})

app.get('/api/thumbnail/:id', async (req, res) => {
	try {
		const id = req.params.id

		/**
		 * @type {import('http').IncomingMessage}
		 */
		const data = (
			await axios.get(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, {
				responseType: 'stream'
			})
		).data

		res.header('content-type', 'image/webp')
		res.header('cache-control', 'max-age=1209600')

		data.pipe(sharp().resize(640, 360)).pipe(res)
	} catch {
		res.status(404).send('not found')
	}
})

app.use(handler)

app.listen(3000, () => {
	console.log('Listening on port 3000')
})
