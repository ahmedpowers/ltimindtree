
import express from 'express';
import querystring from 'querystring';
import request from 'request';
import { trackPage, createTrack, getTrackByISRC, getTracksByArtist } from '../controllers/trackController.js';

const router = express.Router();

router.get('/enter-track-isrc', trackPage)

// Create track
router.post('/track', createTrack);

// Get track by ISRC
router.get('/track/:isrc', getTrackByISRC);

// Get tracks by artist name
router.get('/tracks/artist/:artistName', getTracksByArtist);

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
const client_id = '0aa3d88c22ed42589ec92b55d44a478a';
const redirect_uri = 'http://localhost:3000/api/callback';
const client_secret = '6dba48779d234b46bbd1116e9f08cdb2'; 


// OAUTH process 
router.get('/login', function(req, res) {

  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {

  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token;

        // Store in sessions, needs secuirty - web workers/ closures/ encrypt
        req.session.access_token = access_token;


        res.redirect('/api/enter-track-isrc');
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

export default router;
