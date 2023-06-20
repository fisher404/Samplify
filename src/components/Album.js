import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, ListGroup } from 'react-bootstrap';

const Album = (album) => {
    console.log(album)
    return (
        <Container>
            <Card>
            {/* <Card.Img src={album.images[0].url} />
                <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <ListGroup>
                        {album.tracks.items.map(track => <ListGroup.Item key={track.id}>{track.name}</ListGroup.Item>)}
                    </ListGroup>
                </Card.Body> */}
            </Card>
        </Container>
    )
}

export default Album;