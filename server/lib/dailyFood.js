const request = require('request-promise');
const cheerio = require('cheerio');
const Iconv = require('iconv').Iconv;
const translator = new Iconv('cp1251', 'utf-8');

const Cache = require('./cache');

const url = 'http://dailyfoodrussia.com/menu/stanislavskogo/';

const form = {
  setFilter: 'yes',
  foodUsefulTypes: '',
  propertiesFoodType: ['lunch'],
};

const options = {
  method: 'POST',
  url,
  form,
  encoding: null,
  transform(body) {
    return cheerio.load(translator.convert(body).toString());
  },
};

function extractData($) {
  const result = {};

  $('ul.menu-filter > li').each((idx, section) => {
    const title = $('a.menu-filter-item', section).text().trim().replace(/\(\d+\)/, '');
    result[title] = [];

    $('ul.menu-filter_content > li', section).each((i, el) => {
      const complex = $('img[src*="blackberry"]', el).length === 1;
      const price = parseInt($('li.price', el).text(), 10);
      const entry = {
        name: $('strong', el).text().trim(),
        price,
        complex,
      };
      result[title].push(entry);
    });
  });

  return result;
}

function onErr() {
  return {};
}

const cache = new Cache();

function updateCache(data) {
  cache.update(data);
  return data;
}

function getTodayMenu(callback) {
  if (cache.valid()) {
    callback(cache.data);
  } else {
    request(options)
      .then(extractData)
      .then(updateCache)
      .catch(onErr)
      .then(callback);
  }
}

module.exports = {
  getTodayMenu,
};
