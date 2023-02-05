const http = require('http');
const fs = require('fs');

const common = require('./utils/common')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url
  switch (url) {
    case '/':
      fs.readFile('./views/index.html', function (err, html) {
        if (err) throw err;
        res.statusCode = 200
        res.write(html)
        res.end()
      })  
      break
    case '/now':
      res.end(common.currentDate())
      break;
    case '/tz':
      res.write(common.timezone())
      res.end()
      break;      
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page Not Found');    
  }  
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});