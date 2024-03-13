import express from 'express';
import fs from 'fs';
import { userToken } from './oauthget.js';
const app = express();
const port = 5173;
const { spotify } = JSON.parse(fs.readFileSync('./config.json'));
const auth = JSON.parse(fs.readFileSync('./secrets.json'));

export async function tokenrefresh() {

const refreshtoken = auth.refresh_token;
    console.log(refreshtoken);

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: `grant_type=refresh_token&refresh_token=${refreshtoken}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(spotify.client_id + ':' + spotify.client_secret).toString('base64'))
            },
    json: true
    };
    
    const authToken = await userToken(authOptions);
    const dataJSON = fs.readFileSync("./secrets.json");
    const data = JSON.parse(dataJSON);
    data.access_token = authToken.access_token;
    data.expires_in = (Date.now() + 3600000);
    fs.writeFileSync("./secrets.json", JSON.stringify(data, null, 2));
    return data.access_token;
};