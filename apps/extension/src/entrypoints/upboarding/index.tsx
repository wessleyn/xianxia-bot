import '@styles/globals.css';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import Provider from '../../components/Provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <Route path="/" element={<></>}> //layout here
      {/* multiple pages here*/}
    </Route>
  </Provider>
);
