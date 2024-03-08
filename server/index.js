import axios from 'axios';
import fs from 'fs';
import { getTags } from './getTags.js';

const auth = JSON.parse(fs.readFileSync('./secrets.json'));

const playlistTracks = [];
const limit = 50;
let offset = 0;
let total = 0;

do {
  const playlist = await axios( {
    url: `https://api.spotify.com/v1/playlists/6tAJAQYDLl0zRsYaJy7rfe/tracks?fields=items%28track%28name%2Cartists%28name%29%29%29%2Ctotal%2Climit%2Coffset&limit=${limit}&offset=${offset}`,
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

fs.writeFileSync("./songs.json", JSON.stringify(playlistTracks, null, 2));

for (
  const track of playlistTracks
){
  console.log(await getTags(track.track.artists[0].name, track.track.name));
};



// https://open.spotify.com/playlist/6tAJAQYDLl0zRsYaJy7rfe?si=96a75fb0d0fb4ced

// fs.writeFileSync("./songs.json", JSON.stringify(playlistTracks, null, 2));

// const search = await axios( {
//   url: `https://api.spotify.com/v1/search?q=track%253AMirage%2520artist%253AAmaryllis&type=track`,
//   method: "get",
//   headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Bearer ' + auth.access_token,
//     },
// });

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