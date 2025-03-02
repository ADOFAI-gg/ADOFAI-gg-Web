import httpProxy from 'http-proxy'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const proxy = httpProxy.createProxyServer({ changeOrigin: true })

http
	.createServer((req, res) => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
		res.setHeader('Access-Control-Allow-Credentials', 'true')
		proxy.web(req, res, { target: process.env.API_PROXY_TARGET })
	})
	.listen(5174)
console.log('listening on http://localhost:5174')
