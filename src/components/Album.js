import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = 'cf479909f4224f99b490d434496cfe6a';

const Album = () => {

    const location = useLocation();
    const [ accessToken, setAccessToken ] = useState('');

    if (location.state?.album) {
        console.log(location.state.album)
        const currentAlbum = location.state.album
    }
    else {
        console.log("fetch data")
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
        .then((data) => setAccessToken(data.access_token));
        
        const fetchAlbums = async () => {
            const artistParams = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
                },
            };
        
            const albumsResponse = await fetch(
                `https://api.spotify.com/v1/artists/${artistAlbum}/albums`,
                artistParams
            );
            const albumsData = await albumsResponse.json();
        
            setArtistAlbums(albumsData.items);
            };
        
            if (accessToken) {
            fetchAlbums();
            }
    }

    const trackDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
      
    return (
        <Container>
            <Card> <h1>Hello</h1>
            {/* <Card.Img src={currentAlbum.images[0].url}
            style={{
                width: '30%',
                height: 'auto',
                margin: '0 auto',
            }} />
                <Card.Body>
                    <Card.Title>
                        <h2>{currentAlbum.name} - {"  "}
                        {currentAlbum.artists[0].name}</h2>
                    </Card.Title>
                    <ListGroup>
                        {currentAlbum.tracks.items.map
                        (track => 
                        <ListGroup.Item key={track.id}>
                            <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <div>
                                    {track.track_number} - {"  "}
                                    <strong>{track.name}</strong> {"  "}
                                    ({trackDuration(track.duration_ms)})
                                </div>
                                <div>
                                    <audio controls style={{ height: '50px' }}>
                                    <source src={track.preview_url} />
                                    </audio>
                                </div>
                            </div>
                        </ListGroup.Item>)}
                    </ListGroup>
                </Card.Body> */}
            </Card>
        </Container>
    )
}

export default Album;