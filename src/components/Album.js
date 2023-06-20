import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Album = () => {
    const location = useLocation();
    console.log(location.state.album)
    const currentAlbum = location.state.album
    const trackDuration = (durationMs) => {
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
    return (
        <Container>
            <Card>
            <Card.Img src={currentAlbum.images[0].url} />
                <Card.Body>
                    <Card.Title>{currentAlbum.name}</Card.Title>
                    <ListGroup>
                        {currentAlbum.tracks.items.map(track => 
                        <ListGroup.Item key={track.id}>
                        {track.track_number}{" "} - {" "}
                        <strong>{track.name}</strong>{" "}
                        <u>{trackDuration(track.duration_ms)}</u>
                        </ListGroup.Item>)}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Album;