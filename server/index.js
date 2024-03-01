import axios from 'axios';
import fs from 'fs';

const auth = JSON.parse(fs.readFileSync('./secrets.json'));

const spotifyTracks = [];
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
  spotifyTracks.push(...playlistResult.items)
  offset = offset + limit;
  
} while (offset < total);

fs.writeFileSync("./songs.json", JSON.stringify(spotifyTracks, null, 2));

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




// const result = await fetch('https://accounts.spotify.com/api/token', {
//     method: "POST",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//       },
//     body: 'grant_type=client_credentials',
// });

// const auth = await result.json();

// const playlist = await fetch('https://api.spotify.com/v1/albums/7Ex9R18dme801eWfW0RtAe', {
//     method: "GET",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Bearer ' + auth.access_token,
//       },
// });

// console.log(await playlist.json());


// const album = await axios( {
//     url: 'https://api.spotify.com/v1/albums/7Ex9R18dme801eWfW0RtAe',
//     method: "get",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Bearer ' + auth.access_token,
//       },
// });

// console.log(await album.data);