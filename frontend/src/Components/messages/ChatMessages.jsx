import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import MessagesForm from '../forms/MessagesForm';
import ChatMessagesHeader from './ChatMessagesHeader';
import Message from './Message';

const ChatMessages = ({ props }) => {
  const { currentChannelId, username, channels } = props;
  const messages = useSelector((state) => state.messagesReducer.messages);
  const filter = messages.filter(({ channelId }) => channelId === currentChannelId);
  const currentChannelName = channels.find(({ id }) => id === currentChannelId) || '';
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filter]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatMessagesHeader currentChannelName={currentChannelName} count={filter.length} />
        <div className="chat-messages overflow-auto px-5 ">
          {filter.map((item) => (
            <Message
              key={item.id}
              item={item}
              messagesEndRef={messagesEndRef}
              localUsername={username}
            />
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessagesForm props={props} />
        </div>
      </div>
    </Col>
  );
};

export default ChatMessages;
