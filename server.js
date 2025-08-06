const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8002;

const server = http.createServer((req, res) => {
    if (
        req.url === '/' ||
        req.url === '/index.html' ||
        req.url.startsWith('/?')
    ) {
        // Read the index.html file
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }

            // Replace the placeholder with the actual API key
            const apiKey = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';
            const processedHtml = data.replace(
                /GOOGLE_API_KEY_PLACEHOLDER/g,
                apiKey
            );

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(processedHtml);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Make sure to set GOOGLE_API_KEY environment variable`);
});
