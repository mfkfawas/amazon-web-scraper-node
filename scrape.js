const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const url =
  'https://www.amazon.co.uk/Apple-24-inch-8%E2%80%91core-7%E2%80%91core-ports/dp/B0932Y7SLQ?ref_=ast_slp_dp&th=1';

const product = { name: '', price: '', link: '' };

// const handle = setInterval(scrape, 2000);

async function scrape() {
  console.log('hai');
  //fetch the data
  const { data } = await axios.get(url);

  //load up the html
  const $ = cheerio.load(data);
  //select a common container which holds the data that we need
  const item = $('div#dp-container');

  //extract the data that we need
  product.name = $(item).find('h1 span#productTitle').text().trim();
  const price = $(item).find('span .a-price-whole').first().text().replace(/[,.]/g, '');
  const priceNum = +price;

  product.link = url;
  product.price = priceNum;

  //send an SMS
  if (priceNum < 1500) {
    //E164 FORMAT ERROR
    client.messages
      .create({
        body: `The price of ${product.name} went below ${price}. Purchase it at ${product.link}`,
        from: '+918943327547',
        to: '+91 471 8943327547',
      })
      .then(message => {
        console.log(message);
        clearInterval(handle);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
scrape();
