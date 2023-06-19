import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from'react-bootstrap';
import { Navbar, Nav } from'react-bootstrap';

const Menu = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Spotify Clone</Navbar.Brand>
                {/* <Navbar.Link href='/artists'>Artists</Navbar.Link>
                <Navbar.Link href='/albums'>Artists</Navbar.Link>
                <Navbar.Link href='/songs'>Songs</Navbar.Link>
                <Navbar.Link href='/playlist'>Playlist</Navbar.Link> */}
                <Nav.Link href='/'>Home</Nav.Link>
            </Container>
        </Navbar>
    );
}

export default Menu;