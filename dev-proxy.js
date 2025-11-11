import httpProxy from 'http-proxy';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const proxy = httpProxy.createProxyServer({ changeOrigin: true });

http
	.createServer((req, res) => {
		res.setHeader('access-control-allow-origin', 'http://localhost:5173');
		res.setHeader('access-control-allow-credentials', 'true');
		proxy.web(req, res, { target: process.env.DEV_PROXY_TARGET });
	})
	.listen(3000);
console.log('listening on http://localhost:3000');
