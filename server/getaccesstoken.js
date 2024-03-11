import express from 'express';
import fs from 'fs';
import { userToken } from './oauthget.js';
const app = express();
const port = 5173;
const { spotify } = JSON.parse(fs.readFileSync('./config.json'));   // add your client ID/secret to config.json (MAKE TEMPLATE)
const redirect_uri = 'http://localhost:5173/callback'

app.get('/login', function(req, res) {
    
    const state = 'racingcars';
    const scope = 'playlist-modify-public playlist-modify-private';
    
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${spotify.client_id}&redirect_uri=${redirect_uri}&state=${state}&show_dialog=true&response_type=code&scope=${scope}`);
});

app.get('/callback', async function(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log(code);

    if (state === null) {
        res.redirect('/#state_mismatch');
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(spotify.client_id + ':' + spotify.client_secret).toString('base64'))
            },
            json: true
        };
        const authToken = await userToken(authOptions);
        console.log(authToken);
        fs.writeFileSync('./secrets.json', JSON.stringify(authToken, null, 2));
    }
});

app.listen(port, function (){
    console.log(`Example app listening on port ${port}!`)
});