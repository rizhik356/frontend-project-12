import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions as channelsAction } from "../../slices/channelsSlice";

const DefaultChannel = ({ props }) => {

    const { item, currentChannelId } = props; 
    const dispatch = useDispatch();

    const handleClick = (id) => () => {
        dispatch(channelsAction.changeCurrentId({ currentChannelId: id }));
    };

    return (
        <Button type='button'
        onClick={handleClick(item.id)}
        variant={item.id === currentChannelId ? 'success' : false}
        className='w-100 text-start btn'>
        <span className='me-1'>#</span>
        {item.name}
        </Button>
    )
};

export default DefaultChannel;