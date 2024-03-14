// import fs from 'fs';
import axios, { all } from 'server/node_modules/axios';

function revealMessage() {
    document.getElementById("hiddenMessage").style.display = 'block';
};

const id = []

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const playlist = document.getElementById("playlist");
    const track = document.getElementById("track");

    if (playlist.value == "" || track.value == "") {
        console.log("empty!")
    } else {
        const playlistID = playlist.value.match(/playlist\/(.*)(\?)/)[1];
        const trackID = track.value.match(/track\/(.*)(\?)/)[1];
        id.push(playlistID, trackID)
        console.log(`playlist is ${id[0]} and track is ${id[1]}`);
        const add = axios( {
        url: `https://api.spotify.com/v1/playlists/${id[0]}/tracks`,
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.access_token,
        },
        data: {
            "uris": [
            `spotify:track:${id[1]}`
            ]
      },
});
    };
});

// REGEX ACTUALLY WORKED!?!?!?

// regex for playlist link: (/playlist\/(.*)(\?)/)[1]
// regex for track link: (/track\/(.*)(\?)/)[1]