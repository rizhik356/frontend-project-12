import React, { useEffect, useRef } from 'react';
import { ListGroup } from 'react-bootstrap';
import DefaultChannel from './channels/DefaultChannel';
import RemovableChannel from './channels/RemovableChannel';

const ChannelsList = ({ props }) => {
  const { channels, currentChannelId } = props;
  const channelRef = useRef(null);

  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelId]);

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((item) => (
        <ListGroup.Item
          as="li"
          key={item.id}
          ref={item.id === currentChannelId ? channelRef : null}
          className="nav-item w-100"
        >
          {!item.removable
            ? <DefaultChannel props={{ item, currentChannelId }} />
            : <RemovableChannel props={{ item, currentChannelId }} />}
        </ListGroup.Item>
      ))}
    </ul>
  );
};

export default ChannelsList;
