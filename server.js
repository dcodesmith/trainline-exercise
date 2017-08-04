const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const app = http.createServer((request, response) => {
	const url = parse(request.url, true);
	const { query: { latency } } = url;
	const filePath = path.join(__dirname, 'data', url.pathname);

	fs.readFile(filePath, 'utf8', (err, content) => {
		if (err) {        
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.write(err);
			response.end();
			return;
		}

		response.writeHead('200', {
			'Content-Type': 'text/json',
			'Access-Control-Allow-Origin': '*',
			'X-Powered-By':'trainline'
		});

		setTimeout((() => {
			response.write(content);
		  response.end();
		}), latency);
	});
});

app.listen(3001);