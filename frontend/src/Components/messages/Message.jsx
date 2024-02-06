import React from 'react';
import { Col, Card } from 'react-bootstrap';
import cn from 'classnames';
import leoProfanity from '../../leoProfanity';

const Message = ({ item, messagesEndRef, localUsername }) => {
  const { username, id, body } = item;
  const isUserMessage = username === localUsername;
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
          {leoProfanity(body)}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Message;
