import { NextUIProvider } from '@nextui-org/react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Router } from './routes/router';

interface IRenderProps {
  path: string;
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <NextUIProvider locale="RU-ru">
      <StaticRouter location={path}>
        <Router />
      </StaticRouter>
    </NextUIProvider>
  );
};
