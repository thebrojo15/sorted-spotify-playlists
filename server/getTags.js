import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
const auth = JSON.parse(fs.readFileSync('./config.json'));

// artist and track need + for spaces... look at .replace...?

export async function getTags(artist, track) {
  const topTags = await axios( {
    url: `https://ws.audioscrobbler.com/2.0/?method=track.search&artist=${artist}&track=${track}&api_key=${auth.api_key}&format=json`,
    method: "get"
  });

  const var2 = await axios.get(topTags.data.results.trackmatches.track[0].url)
  const $ = cheerio.load(var2.data)
  const trackTags = $('.tag')
    .map((_, product) => {
    const $product = $(product);
    return $product.text()
      })
      .toArray();
    return trackTags;
};