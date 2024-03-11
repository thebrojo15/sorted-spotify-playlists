import axios, { all } from 'axios';
import fs from 'fs';
import { getTags } from './gettags.js';

const auth = JSON.parse(fs.readFileSync('./secrets.json'));  // add this

const playlistTracks = [];
const limit = 50;
let offset = 0;
let total = 0;

do {
  const playlist = await axios( {
    url: `https://api.spotify.com/v1/playlists/6KpToLvrt2Owm5kF6AP5Qp/tracks?fields=items%28track%28name%2Cartists%2Curi%28name%29%29%29%2Ctotal%2Climit%2Coffset&limit=${limit}&offset=${offset}`,
    method: "get",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + auth.access_token,
      },
  });
  
  const playlistResult = playlist.data;
  total = playlistResult.total;
  playlistTracks.push(...playlistResult.items)
  offset = offset + limit;
  
} while (offset < total);

const allTracks = []

for (
  const track of playlistTracks
){
  const tagResult = await getTags(track.track.artists[0].name, track.track.name);
  const trackTags = {artist:(track.track.artists[0].name), name:(track.track.name), uri:(track.track.uri), tags:tagResult};
  allTracks.push(trackTags);
  // fs.appendFileSync("./songs.json", JSON.stringify(trackTags, null, 2));
  console.log(trackTags);
};

fs.writeFileSync("./songs.json", JSON.stringify(allTracks, null, 2));

// https://open.spotify.com/playlist/6KpToLvrt2Owm5kF6AP5Qp?si=5659ca59a0ea484a

// fs.writeFileSync("./songs.json", JSON.stringify(playlistTracks, null, 2));

// const searchResults = []

// for (
//   const {name, artist} of allTracks
// ){
// const spotifySearch = await axios( {
//   url: `https://api.spotify.com/v1/search?q=track%253A${name}%2520artist%253A${artist}&type=track&limit=1`,
//   method: "get",
//   headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Bearer ' + auth.access_token,
//     },
// })
// searchResults.push(spotifySearch.data);
// };

// // fs.writeFileSync("./spotifySearch.json", JSON.stringify(searchResults, null, 2));

// // const finalResult = JSON.parse(searchResults)

// const trackUri = [];

// for (
//   const item of searchResults
// ){
//   const uri = {uri:(item.tracks.items[0].uri)}
//   trackUri.push(uri);
// }

// fs.writeFileSync("./spotifySearch.json", JSON.stringify(trackUri, null, 2));
// // console.log(JSON.stringify(searchResults[0].tracks.items[0].uri));

// fs.writeFileSync("./searchResult.json", JSON.stringify(search.data, null, 2));

// const add = await axios( {
//     url: 'https://api.spotify.com/v1/playlists/6tAJAQYDLl0zRsYaJy7rfe/tracks',
//     method: "post",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + auth.access_token,
//       },
//       data: {
//         "uris": [
//          "spotify:track:7LNGKMtmzXWYCQEhtivb9M"   
//         ]
//       },
// });