import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../../routes';
import { actions as channelsAction } from '../../slices/channelsSlice';
import { actions as messagesAction } from '../../slices/messagesSlice';
import ChannelsList from '../ChannelsList';
import ChatMessages from '../ChatMessages';
import ModalAddChannel from '../channels/modals/ModalAddChannel';

const Main = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelsReducer.channels);
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  const localStorageParse = (id) => JSON.parse(localStorage.getItem(id));
  const { username } = localStorageParse('userId');
  const props = { channels, currentChannelId, username };

  const getAuthHeader = useCallback(() => {
    const userId = localStorageParse('userId');

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  }, []);

  useEffect(() => {
    const requestData = async () => {
      try {
        const responce = await axios.get(routes.getChannels(), { headers: getAuthHeader() });
        dispatch(channelsAction.initChannels(responce.data));
        dispatch(messagesAction.initMessages(responce.data));
      } catch (e) {
        throw new Error(e);
      }
    };
    requestData();
  }, [dispatch, getAuthHeader]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <ModalAddChannel />
          </div>
          <ChannelsList props={props} />
        </Col>
        <ChatMessages props={props} />
      </Row>
    </Container>
  );
};

export default Main;
