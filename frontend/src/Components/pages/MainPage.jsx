import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import routes from '../../routes';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsAction } from '../../slices/channelsSlice';
import {actions as messagesAction} from '../../slices/messagesSlice'
import ChannelsList from '../ChannelsList';
import ChatMessages from '../ChatMessages';

const Main = () => {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channelsReducer.channels);
    const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
    const localStorageParse = (id) =>  JSON.parse(localStorage.getItem(id));
    const username = localStorageParse('userId').username;
    const props = { channels, currentChannelId, username, }


  //  const [status, changeStatus] = useState('')


    const getAuthHeader = useCallback(() => {
        const userId = localStorageParse('userId');
      
        if (userId && userId.token) {
          return { Authorization:  `Bearer ${userId.token}` };
        }
      
        return {};
    }, []);
      

    useEffect (() => {
        const requestData = async () => {
            try {
                const responce = await axios.get(routes.getChannels(), { headers: getAuthHeader() });
                dispatch(channelsAction.initChannels(responce.data));
                dispatch(messagesAction.initMessages(responce.data));
            } catch (e) {
                throw new Error(e)
            }
        }
        requestData()
    }, [dispatch, getAuthHeader]);


    return (
        <Container className='h-100 my-4 overflow-hidden rounded shadow'>
            <Row className='h-100 bg-white flex-md-row'>
                <Col md={2} className='col-4 border-end px-0 bg-light flex-column h-100 d-flex'>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>Каналы</b>
                        <Button type="button" variant='group-vertical' className='p-1 text-success'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <span className='visually-hidden'></span>
                        </Button>
                    </div>
                        <ChannelsList props={props}/>
                </Col>
                    <ChatMessages props={props} />
            </Row>
        </Container>    
    )
}

export default Main;