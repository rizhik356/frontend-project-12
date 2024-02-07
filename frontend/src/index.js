import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import RunApp from './init.js';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RunApp />
  </Provider>,
);
