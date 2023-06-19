import React from 'react';
import { createRoot } from "react-dom/client";
import ArtistSearch from "./components/ArtistSearch";
import { BrowserRouter } from "react-router-dom";
import Menu from './components/Menu';

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
    <BrowserRouter>
        <Menu />
        <ArtistSearch />
    </BrowserRouter>
);