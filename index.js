const request = require('request-promise');
const http = require('http');

const frequency = process.env.FREQUENCY || 60*60*5*1000;
const sites = process.env.SITES ? process.env.SITES.split(' ') : null;
const pinbotDomain = process.env.PINGBOT_DOMAIN;

if (!pinbotDomain) {
  console.error(`Enviornment vairable "pinbotDomain" required`);
}

if (!sites) {
  console.error(`Enviornment vairable "sites" required`);
}

function ping() {
  console.log(`Ping at: ${new Date()}`);
  request(pinbotDomain).catch(console.error);
  sites.forEach(site => {
    request(site).catch(console.error);
  });
}

ping();
setInterval(ping, frequency);

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end('Thanks for keepin me alive!');
}).listen(process.env.PORT || 3000);
