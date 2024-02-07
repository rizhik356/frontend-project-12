import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import resources from './locales/index.js';
import socket from './services/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import App from './App.js';

import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

const RunApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>

  );
};

export default RunApp;
