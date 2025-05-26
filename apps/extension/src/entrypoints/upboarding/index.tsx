import '@styles/globals.css';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Provider from '../../components/Provider';
import NextSteps from './(steps)/nextsteps';
import UpdatedFeatures from './(steps)/updatedfeatures';
import WhatsNew from './(steps)/whatsnew';
import Layout from './components/Layout';


// TODO: remove mock data and fetch real changelog
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
      <Route path="/" element={<Layout />}>
        <Route index element={<WhatsNew />} />
        <Route path="updatedfeatures" element={<UpdatedFeatures />} />
        <Route path="nextsteps" element={<NextSteps />} />
      </Route>
  </Provider>
);
