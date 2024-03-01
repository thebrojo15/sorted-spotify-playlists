import axios from 'axios';
import fs from 'fs';

const auth = JSON.parse(fs.readFileSync('./secrets.json'));

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

const playlist = await axios( {
  url: 'https://api.spotify.com/v1/playlists/6tAJAQYDLl0zRsYaJy7rfe/tracks?fields=items%28track%28name%29%29&limit=10&offset=5',
  method: "get",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + auth.access_token,
    },
});

console.log(JSON.stringify(playlist.data, null, 1));

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