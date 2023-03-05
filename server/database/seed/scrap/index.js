const { JSDOM } = require('jsdom');
const selector = require('./selectors.js');
const fs = require('fs').promises;

const data = [];

async function scrapOne(url) {
  const res = await fetch(url);
  const text = await res.text();
  const { document } = new JSDOM(text).window;
  
  // selectorName is a string
  function getDOM(selectorName) {
    return document.querySelector(selector[selectorName]);
  }

  const title = getDOM('title')?.textContent || null;
  const cover = getDOM('cover')?.src || null;
  const author = getDOM('author')?.textContent || null;
  const pageCount = parseInt(getDOM('pageCount')?.textContent?.split(',')[0] || NaN) || null;

  // use regex to get the actual data
  const dateText = getDOM('date')?.textContent;
  let date;
  if (dateText) {
    const matchObj = dateText.match(/.*\b(?<date>[a-z]+\s\d+[,]\s\d{2,})$/i);
    date = matchObj.groups?.date || null;
  }

  // summary may have different paragraphs
  const summaryElems = getDOM('summary')?.childNodes || null;
  const summaryTexts = [];
  if (summaryElems) {
    summaryElems.forEach(node => {
      if (node.textContent) summaryTexts.push(node.textContent);
    });
  }
  const summary = summaryTexts.join(' ');

  // get all genres into one array
  const genreElems = getDOM('genre')?.children || null;
  const genre = [];
  if (genreElems) {
    for (let i = 1; i < genreElems.length; i++) {
      genre.push(genreElems[i].textContent);
    }
  }

  const book = {
    title, cover, author, pageCount, date, genre, summary
  };

  data.push(book);
}

async function get100BookLinkByPage(pageCount) {
  const pageURL = 'https://www.goodreads.com/list/show/423.Books_that_Exceeded_your_Expectations?page=' + pageCount;

  const res = await fetch(pageURL);
  const text = await res.text();

  const { document } = new JSDOM(text).window;

  const bookURL = [];
  const bookSelector = '#all_votes > table > tbody > tr > td > a.bookTitle';
  const bookAnchors = document.querySelectorAll(bookSelector);
  bookAnchors.forEach(a => bookURL.push('https://www.goodreads.com' + a.href));

  return bookURL; 
}

async function scrapByPage(pageNumber) {
  const start = new Date();
  const urls = await get100BookLinkByPage(pageNumber);
  
  for (let i = 0; i < urls.length; i++) {
    await scrapOne(urls[i]);
    console.log(`Page ${pageNumber}: Book ${i} has finished...`);
  }

  const end = new Date();
  return Math.floor((end - start)/1000);
}

async function scrap500Books() {
  for (let i = 1; i <= 5; i++) {
    const timeUsed = await scrapByPage(i);
    console.log(`Scrap 100 books took around ${timeUsed} seconds`);
    await fs.writeFile('../data/data.json', JSON.stringify(data, null, 2));
    await (async() => { setTimeout(() => {}, 60_000) })();
  }
}
scrap500Books()
  .then(() => 'Finished 500 scraps...')
  .catch(console.log);
