const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const filePath = path.join(__dirname, 'data', 'ldb.json');

const app = http.createServer((request, response) => {
	console.log(request.url);
	const uri = url.parse(request.url).pathname;
	console.log(uri);
	
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
	  response.write(content);
	  response.end();
	});
});

app.listen(3001);