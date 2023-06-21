import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from'react-bootstrap';

const Menu = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary text-white mb-4" bg="dark" data-bs-theme="dark" >
            <Container>
                <Navbar.Brand href="/">Spotify Clone</Navbar.Brand>
                <Nav.Link href='/'>Home</Nav.Link>
                <Nav.Link href='/artists'>Artists</Nav.Link>
                <Nav.Link href='/albums'>Albums</Nav.Link>
                <Nav.Link href='/songs'>Songs</Nav.Link>
                <Nav.Link href='/playlist'>Playlists</Nav.Link>
            </Container>
        </Navbar>
    );
}

export default Menu;