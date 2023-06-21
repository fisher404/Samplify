import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CLIENT_ID = '9b2683978ec447ff89addbff75c2ab89';
const CLIENT_SECRET = 'cf479909f4224f99b490d434496cfe6a';

const ArtistSearch = () => {
const [ searchInput, setSearchInput ] = useState('');
const [ accessToken, setAccessToken ] = useState('');
const [ artists, setArtists ] = useState([]);

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
        Authorization: 'Bearer ' + accessToken,
      },
    };
  
    const searchQuery = encodeURIComponent(searchInput);
    
    const searchResults = await fetch(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data.artists.items;
      })
      .catch((error) => {
        console.error('Error:', error);
        return [];
      });
  
    const artistIds = searchResults.map((artist) => artist.id);
    
    const artistsData = await Promise.all(
      artistIds.map((artistId) =>
        fetch(`https://api.spotify.com/v1/artists/${artistId}`, searchParams)
          .then((response) => response.json())
          .catch((error) => {
            console.error('Error:', error);
            return null;
          })
      )
    );
  
    setArtists(artistsData.filter((artist) => artist !== null));
  }

    return (
        <div className='Main'>
        <Container>
            <InputGroup className='mb-3' size='lg'>
                <FormControl 
                placeholder='Search For Artist'
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
              {artists.map((artist) => {
                  return (
                    <Link key={artist.id} to={`/artist`} state={{ artist: artist }}>
                      <Card key={artist.id}>
                          {artist.images.length > 0 ? (
                          <Card.Img src={artist.images[0].url} />
                            ) : ( null )}
                          <Card.Body>
                              <Card.Title>{artist.name}</Card.Title>
                          </Card.Body>
                      </Card>
                    </Link>
                  )})}
            </Row>
        </Container>
        </div>
    )
}

export default ArtistSearch;