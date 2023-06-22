import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Menu from './Menu'
import AlbumSearch from './AlbumSearch';
import ArtistSearch from './ArtistSearch';
import Album from './Album';
import Artist from './Artist';
// import SongsSearch from './components/SongsSearch';
// import PlaylistSearch from './components/PlaylistSearch';

const Main = () => {
    const location = useLocation();
    const isMainPage = location.pathname === '/';
    return (
    <div className="bg-dark text-white min-vh-100">
        <Menu />
        <Routes>
            <Route path="/artists" element={<ArtistSearch />}/>
            <Route path="/artist" element={<Artist />}/>
            <Route path="/albums" element={<AlbumSearch />}/> 
            <Route path='/album' element={<Album />}/>
            {/* <Route path='/songs' element= {<SongsSearch />}/>
            <Route path='/playlists'element=  {<PlaylistSearch />}/> */}
        </Routes> 
        {isMainPage && (
        <div className="container text-center mt-5">
          <h1 className="display-4">Welcome to Janice Fisher's </h1>
          <img src="https://zeevector.com/wp-content/uploads/Black-Spotify-Logo.png"
            alt="Spotify Logo"
            style={{ width: '200px', height: 'auto' }} />
           <h1 className="display-4">API Demo</h1>
        </div>
      )}
        </div>
   );
}

export default Main;