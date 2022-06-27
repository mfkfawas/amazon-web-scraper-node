const axios = require('axios');
const cheerio = require('cheerio');

const url =
  'https://www.amazon.co.uk/Apple-24-inch-8%E2%80%91core-7%E2%80%91core-ports/dp/B0932Y7SLQ?ref_=ast_slp_dp&th=1';

const product = { name: '', price: '', link: '' };

async function scrape() {
  //fetch the data
  const { data } = await axios.get(url);

  //load up the html
  const $ = cheerio.load(data);
  //select a common container which holds the data that we need
  const item = $('div#dp-container');

  //extract the data that we need
  product.name = $(item).find('h1 span#productTitle').text();
  product.link = url;
  const price = $(item).find('span .a-price-whole').first().text().replace(/[,.]/g, '');
  console.log(price);
}

scrape();
