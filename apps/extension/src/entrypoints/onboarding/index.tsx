import '@styles/globals.css';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Provider from '../../components/Provider';
import Features from './(steps)/features';
import Settings from './(steps)/settings';
import Welcome from './(steps)/welcome';
import Layout from './components/Layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <Route path="/" element={<Layout />}>
      <Route index element={<Welcome />} />
      <Route path="settings" element={<Settings />} />
      <Route path="features" element={<Features />} />
    </Route>
  </Provider>
);