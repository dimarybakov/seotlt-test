import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { MaxUI } from '@maxhub/max-ui';

import '@maxhub/max-ui/dist/styles.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MaxUI>
      <App />
    </MaxUI>
  </BrowserRouter>,
);
