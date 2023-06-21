import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Menu from './Menu'
import AlbumSearch from './AlbumSearch';
import ArtistSearch from './ArtistSearch';
import Album from './Album';
import Artist from './Artist';
// import SongsSearch from './components/SongsSearch';
// import PlaylistSearch from './components/PlaylistSearch';

const Main = () => {
   return (
        <div>
        <Menu />
        <Routes>
            <Route path="/artists" element={<ArtistSearch />}/>
            <Route path="/artist" element={<Artist />}/>
            <Route path="/albums" element={<AlbumSearch />}/> 
            <Route path='/album' element={<Album />}/>
            {/* <Route path='/songs' element= {<SongsSearch />}/>
            <Route path='/playlists'element=  {<PlaylistSearch />}/> */}
        </Routes> 
        </div>
   );
}

export default Main;