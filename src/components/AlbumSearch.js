import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = '96cf5cd041bf43658c60ccea928c1bda';


const AlbumsSearch = () => {
const [ searchInput, setSearchInput ] = useState('');
const [ accessToken, setAccessToken ] = useState('');
const [ albums, setAlbums ] = useState([]);

useEffect (() => {
    //API Access token
    const authParams = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
}, [])

async function search() {
    const searchParams = {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }
    const artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
    .then(response => response.json())
    .then(data => { console.log(data) 
        return data.artists.items[0].id });

    // console.log(artistId)
    // get request with artist ID grab all the albums from the artist
    const albumsData = await fetch ('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', searchParams)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        setAlbums(data.items);
    })
    // display albums to the user
}
    return (
        <div className='Main'>
        <Container>
            <InputGroup className='mb-3' size='lg'>
                <FormControl 
                placeholder='Search For Albums'
                type='input'
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        search();
                    }
                }}
                onChange = {e => setSearchInput(e.target.value)}
                />
                <Button onClick={search}>Search</Button>
            </InputGroup>
        </Container>
        <Container>
            <Row className=" mx-2 row row-cols-4">
                {albums.map((album, i) => {
                    console.log(album)
                    return (
                        <Card>
                            <Card.Img src={album.images[0].url} />
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Row>
        </Container>
        </div>
    )
}

export default AlbumsSearch;