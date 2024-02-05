import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import MessagesForm from './forms/MessagesForm';

const ChatMessages = ({ props }) => {
  const { t } = useTranslation();
  const { currentChannelId, channels } = props;
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
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              {`${t('services.channelSymbol')} ${currentChannelName.name}`}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.counter.count', { count: filter.length })}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5 ">
          {filter.map(({ body, username, id }) => {
            const isUserMessage = username === JSON.parse(localStorage.getItem('userId')).username;
            const colClass = cn('d-flex', {
              'justify-content-end': isUserMessage,
              'justify-content-start': !isUserMessage,
            });
            return (
              <Col key={id} className={colClass}>
                <Card
                  key={id}
                  ref={messagesEndRef}
                  border="0"
                  className="mb-1 text-break d-inline-block"
                  bg={isUserMessage ? 'success' : 'secondary'}
                  text="white"
                >
                  <Card.Body className="p-2">
                    <b style={{ color: 'black' }}>{username}</b>
                    {': '}
                    {body}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessagesForm props={props} />
        </div>
      </div>
    </Col>
  );
};

export default ChatMessages;
