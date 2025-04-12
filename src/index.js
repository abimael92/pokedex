import React from 'react';
import ReactDOM from 'react-dom';
import Pokedex from "./components/Pokedex/Pokedex";
import './index.css';

ReactDOM.render(
    <div className="overlay">
        <Pokedex />
    </div>,
    document.getElementById('root')
);