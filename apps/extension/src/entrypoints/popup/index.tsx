import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Provider from '../../components/Provider';
import Bookmarks from './(dash)/bookmarks';
import Current from './(dash)/current';
import Downloads from './(dash)/downloads';
import Login from './(dash)/login';
import Stats from './(dash)/stats';
import ChapterView from './(novel)/chapter';
import NovelView from './(novel)/novel';
import ToCView from './(novel)/toc';
import Layout from './components/Layout';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <Route path="/" element={<Layout />}>
      <Route index element={<Stats />} />
      <Route path="login" element={<Login />} />
      <Route path="current" element={<Current />} />
      <Route path="bookmarks" element={<Bookmarks />} />
      <Route path="downloads" element={<Downloads />} />
      <Route path="novel" element={<NovelView />} />
      <Route path="toc" element={<ToCView />} />
      <Route path="chapter" element={<ChapterView />} />
    </Route>
  </Provider>
);
