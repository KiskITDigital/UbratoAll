import ReactDOM from 'react-dom/client';
import './index.css';
import './base.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/router.tsx';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,

  <NextUIProvider locale="RU-ru">
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </NextUIProvider>
);
