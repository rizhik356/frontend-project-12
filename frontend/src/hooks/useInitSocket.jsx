import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import socket from '../services';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const useInitSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
      dispatch(channelsActions.changeCurrentId({ currentChannelId: payload.id }));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useInitSocket;
