import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';


const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = 'cf479909f4224f99b490d434496cfe6a';

const Artist = () => {
    const [ accessToken, setAccessToken ] = useState('');
    const [ artistAlbums, setArtistAlbums ] = useState([]);

    const location = useLocation();
    console.log(location.state.artist);
    const currentArtist = location.state.artist;

    useEffect(() => {
        // Fetch access token
        const authParams = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            'grant_type=client_credentials&client_id=' +
            CLIENT_ID +
            '&client_secret=' +
            CLIENT_SECRET,
        };
    
        fetch('https://accounts.spotify.com/api/token', authParams)
          .then((result) => result.json())
          .then((data) => setAccessToken(data.access_token));
      }, []);
    
      useEffect(() => {
        // Fetch artist's albums
        const fetchAlbums = async () => {
          const artistParams = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          };
    
          const albumsResponse = await fetch(
            `https://api.spotify.com/v1/artists/${currentArtist.id}/albums`,
            artistParams
          );
          const albumsData = await albumsResponse.json();
    
          setArtistAlbums(albumsData.items);
          console.log(albumsData.items);
        };
    
        if (accessToken) {
          fetchAlbums();
        }

      }, [accessToken, currentArtist]);

    return (
        <div>
        <Container>
            <Card>
            <Card.Img
                src={currentArtist.images[0].url}
                style={{
                  width: '30%',
                  height: 'auto',
                  margin: '0 auto',
                }} />
                <Card.Title style={{ textAlign: 'center' }}>
                  <h2>{currentArtist.name}</h2>
                </Card.Title>
            <Row className="mx-2 row row-cols-4">
            {artistAlbums.map((album) => (
                <Link key={album.id} to={'/album'}
                    state={{ artistAlbum: album.id }}>
                <Card key={album.id}>
                    <Card.Img src={album.images[0].url} />
                    <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                </Card>
                </Link>
            ))}
            </Row>
            </Card>
        </Container>
        </div>
    );
};

export default Artist;
