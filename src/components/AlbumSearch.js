import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = 'cf479909f4224f99b490d434496cfe6a';


const AlbumSearch = () => {
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

    const searchQuery = encodeURIComponent(searchInput);

    const searchResults = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=album&limit=20`,
        searchParams
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          return data.albums.items;
        })
        .catch((error) => {
          console.error('Error:', error);
          return [];
        });

        const albumIds = searchResults.map((album) => album.id);

        const albumData = await Promise.all(
            albumIds.map((albumId) => 
                fetch(`https://api.spotify.com/v1/albums/${albumId}`, searchParams)
                .then((response) => response.json())
                .catch((error) => {
            console.error('Error:', error);
            return null;
            })
          )
        );

        setAlbums(albumData.filter((album) => album !== null));
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
                {albums.map((album) => {
                    console.log(album)
                    return (
                        <Card key={album.id}>
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


export default AlbumSearch;