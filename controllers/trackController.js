// controllers/trackController.js
import axios from 'axios';
import Track from '../models/Track.js';
import { Op } from "sequelize";

const trackPage = async (req, res) => {

  res.send(`
  <form action="/api/track" method="POST">
  <label for="isrc"> Enter Irsc </label>
  <input type="text" id="isrc" name="isrc"/>
  <button type="submit"> Enter </submit>
  </form>
  `)

}

const createTrack = async (req, res) => {
 
  

  try {
   // Spotify API 
    const accessToken = req.session.access_token;
    const isrc_body  = req.body.isrc;
    const spotifyResponse = await axios.get(`https://api.spotify.com/v1/search?q=isrc:${isrc_body}&type=track`, {
      headers: {
        Authorization: 'Bearer '+accessToken,
      },
    });

    // Extract data from Spotify response
    const trackData = spotifyResponse.data.tracks.items[0];
    const { external_ids, name, artists } = trackData;
    const { isrc } = external_ids;

    const trackExists = await Track.findOne({ where: { isrc } });
    if(trackExists) {
      res.status(201).json({ duplicate: 'Track Exists Already!!!' });
      return;
    } 
    
    const track = await Track.create({
      isrc,
      spotifyImageUri: trackData.album.images[0].url,
      title: name,
      artistNameList: artists.map((artist) => artist.name),
    });

    res.status(201).json(track);
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTrackByISRC = async (req, res) => {
  const { isrc } = req.params;

  try {
    const track = await Track.findOne({ where: { isrc } });

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTracksByArtist = async (req, res) => {
  const { artistName } = req.params;

  try {
    const tracks = await Track.findAll({
      where: {
        artistNameList: {
          [Op.like]: [artistName],
        },
      },
    });

    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { trackPage, createTrack, getTrackByISRC, getTracksByArtist };
