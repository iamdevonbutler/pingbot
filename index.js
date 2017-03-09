const request = require('request-promise');

const frequency = process.env.frequency || 60*60*5;
const sites = process.env.sites ? process.env.sites.split(' ') : null;
const pinbotDomain = process.env.pingbotDomain;

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

setInterval(ping, frequency);
