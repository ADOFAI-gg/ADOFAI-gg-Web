import { handler } from './build/handler.js'

import express from 'express'
import compression from 'compression'

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

app.use(handler)

app.listen(3000, () => {
	console.log('Listening on port 3000')
})
