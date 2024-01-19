import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    channels: [],
  };

  const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        initChannels: (state, { payload }) => {
            state.channels = payload.channels;
            state.currentChannelId = payload.currentChannelId;
        },
        changeCurrentId: (state, { payload }) => {
            state.currentChannelId = payload.currentChannelId;
        }
    }
  });

  export const { actions } = channelsSlice;

  export default channelsSlice.reducer;