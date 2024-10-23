import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/colors.css';
import './styles/variables.css';
import './styles/media.css';
import './styles/config.css';

import './styles/Normalize.css';
import './styles/DefaultColorTheme.css';
import './styles/Application.css';
import './styles/Fonts.css';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
