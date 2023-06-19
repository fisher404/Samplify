import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Main from './components/Main';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <BrowserRouter>
       <Main />
    </BrowserRouter>
);