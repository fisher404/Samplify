import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = 'cf479909f4224f99b490d434496cfe6a';

const Album = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const trackDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

    if (location.state?.album) {
      setCurrentAlbum(location.state.album);
    } else {
      const artistAlbum = location.state.artistAlbum;

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
        .then((data) => {
          setAccessToken(data.access_token);

          const artistParams = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + data.access_token,
            },
          };

          fetch(
            `https://api.spotify.com/v1/albums/${artistAlbum}`,
            artistParams
          )
            .then((response) => response.json())
            .then((albumsData) => {
              setCurrentAlbum(albumsData);
            })
            .catch((error) => {
              console.log('Error fetching albums:', error);
            });
        })
        .catch((error) => {
          console.log('Error fetching access token:', error);
        });
    }

  return (
    <Container>
      {currentAlbum && (
        <Card>
          <Card.Img
            src={currentAlbum.images[0].url}
            style={{
              width: '30%',
              height: 'auto',
              margin: '0 auto',
            }}
          />
          <Card.Body>
            <Card.Title>
              <h2>
                {currentAlbum.name} - {currentAlbum.artists[0].name}
              </h2>
            </Card.Title>
            <ListGroup>
              {currentAlbum.tracks.items.map((track) => (
                <ListGroup.Item key={track.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      {track.track_number} -{' '}
                      <strong>{track.name}</strong> (
                      {trackDuration(track.duration_ms)})
                    </div>
                    <div>
                      <audio controls style={{ height: '50px' }}>
                        <source src={track.preview_url} />
                      </audio>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Album;