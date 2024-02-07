/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: 1,
  defaultChannelId: 1,
  lastAddChannelName: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
      state.defaultChannelId = payload.currentChannelId;
    },
    setLastAddChannelName: (state, { payload }) => {
      state.lastAddChannelName = payload.name;
    },
    changeCurrentId: (state, { payload }) => {
      state.currentChannelId = payload.currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      if (state.lastAddChannelName === payload.name) {
        state.currentChannelId = payload.id;
      }
    },
    renameChannel: (state, { payload }) => {
      state.channels.find((channel) => channel.id === payload.id).name = payload.name;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = state.defaultChannelId;
      }
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
