import axios from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../routes';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MainForm from './MainForm';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsAction } from '../slices/channelsSlice';

const Main = () => {
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channelsReducer.channels);
    const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);
  //  const [status, changeStatus] = useState('')

    const getAuthHeader = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
      
        if (userId && userId.token) {
          return { Authorization: `Bearer ${userId.token}` };
        }
      
        return {};
      };

    useEffect (() => {
        const requestData = async () => {
            try {
                const responce = await axios.get(routes.getChannels(), { headers: getAuthHeader() });
                dispatch(channelsAction.initChannels(responce.data));
            } catch (e) {
                throw new Error(e)
            }
        }
        requestData()
    }, [dispatch]);

    const handleClick = (id) => () => {
        dispatch(channelsAction.changeCurrentId({currentChannelId: id}));
    };
    

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
                    <ul id="channels-box" className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
                    {channels.map((item) => {
                        return (
                            <li key={item.id} className='nav-item w-100'>
                                <Button type='button'
                                 onClick={handleClick(item.id)}
                                 variant={item.id === currentChannelId ? 'success' : false}
                                 className='w-100 rounded-0 text-start btn'>
                                 <span className='me-1'>#</span>
                                 {item.name}
                                </Button>
                            </li>
                        )
                    })}
                    </ul>
                </Col>
                <Col className='p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <div className='bg-light mb-4 p-3 shadow-sm small'>
                            <p className='m-0'>
                                <b>General</b>
                            </p>
                            <span className='text-muted'>0 messages</span>
                        </div>
                        <div className='chat-messages overflow-auto px-5 '></div>
                        <div className='mt-auto px-5 py-3'>
                            <MainForm />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>    
    )
}

export default Main;