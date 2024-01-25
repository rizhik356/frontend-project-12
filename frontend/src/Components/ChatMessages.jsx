import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import MessagesForm from "./forms/MessagesForm";

const ChatMessages = ({ props }) => {
    const { currentChannelId, channels } = props;
    const messages = useSelector((state) => state.messagesReducer.messages);
    const filter = messages.filter(({ channelId }) => channelId === currentChannelId);
    const currentChannelName = channels.find(({ id }) => id === currentChannelId) || '';
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [filter]); 

return (
    <Col className='p-0 h-100'>
        <div className='d-flex flex-column h-100'>
            <div className='bg-light mb-4 p-3 shadow-sm small'>
                <p className='m-0'>
                    <b># {currentChannelName.name}</b>
                </p>
                <span className='text-muted'>{filter.length} messages</span>
            </div>
            <div className="chat-messages overflow-auto px-5 ">
                {filter.map(({ body, username, id }) => {
                    return (
                        <div key={id} ref={messagesEndRef} className="mb-2 text-break">
                            <b>{username}</b>
                            {': '} 
                            {body}
                        </div>
                    )
                })}
            </div>
            <div className='mt-auto px-5 py-3'>
                <MessagesForm props={props} />
            </div>
        </div>
    </Col>
)
};

export default ChatMessages;