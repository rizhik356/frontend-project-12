import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions as channelsAction } from "../slices/channelsSlice";

const ChannelsList = ({ props }) => {
    const { channels, currentChannelId } = props;
    const dispatch = useDispatch();

    const handleClick = (id) => () => {
        dispatch(channelsAction.changeCurrentId({currentChannelId: id}));
    };

return (
    <ul id="channels-box" className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
    {channels.map((item) => {
        return (
            <ListGroup.Item as='li' key={item.id} className='nav-item w-100'>
                <Button type='button'
                 onClick={handleClick(item.id)}
                 variant={item.id === currentChannelId ? 'success' : false}
                 className='w-100 rounded-0 text-start btn'>
                 <span className='me-1'>#</span>
                 {item.name}
                </Button>
            </ListGroup.Item>
        )
    })}
    </ul>
)
};

export default ChannelsList;