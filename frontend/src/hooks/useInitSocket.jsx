import socket from "../services";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions as messagesActions } from "../slices/messagesSlice";

const useInitSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });
  }, []);
};

export default useInitSocket;