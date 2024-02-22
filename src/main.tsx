import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css';
import './index.scss'

import { createTheme, MantineProvider, MantineColorsTuple } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

const myColor: MantineColorsTuple = [
  '#ffebff',
  '#f5d5fc',
  '#e6a9f3',
  '#d779eb',
  '#cb51e4',
  '#c437e0',
  '#c029df',
  '#a91cc6',
  '#9715b1',
  '#840a9c'
];

const theme = createTheme({
  colors: {
    myColor,
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
)
