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
  const item = $('div#dp-container');

  //extract the data that we need
  product.name = $(item).find('h1 span#productTitle').text();
  console.log(product.name);
}

scrape();
