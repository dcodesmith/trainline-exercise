const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const HTTPStatusCodes = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
	NOT_FOUND: 404
};

const app = http.createServer((request, response) => {
	const url = parse(request.url, true);
	const { pathname, query: { latency } } = url;
	const filePath = path.join(__dirname, 'data', pathname);

  fs.exists(filePath, (exists) => {
    if (!exists) {
      response.writeHead(HTTPStatusCodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
      return;
    }

		fs.readFile(filePath, 'utf8', (err, content) => {
			if (err) {
				response.writeHead(HTTPStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'text/plain' });
				response.end(err);
				return;
			}

			response.writeHead(HTTPStatusCodes.OK, {
				'Content-Type': 'text/json',
				'Access-Control-Allow-Origin': '*',
				'X-Powered-By':'trainline'
			});

			setTimeout((() => response.end(content)), latency);
		});
	});
});

app.listen(3001);
