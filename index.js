const request = require('request-promise');

const frequency = process.env.frequency || 60*60*5;
const sites = process.env.sites ? process.env.sites.split(' ') : null;
const pinbotDomain = process.env.pingbotDomain;

if (!pinbotDomain) {
  throw `Enviornment vairable ${pinbotDomain} required`;
}

if (!sites) {
  throw `Enviornment vairable ${sites} required`;
}

function ping() {
  request(pinbotDomain).catch(console.log);
  sites.forEach(site => {
    request(site).catch(console.log);
  });
}

setInterval(ping, frequency);
