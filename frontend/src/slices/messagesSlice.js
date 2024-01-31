import { createSlice, current } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
    messages: [],
  };

  const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        initMessages: (state, { payload }) => {
            state.messages = payload.messages;
            console.log(current(state))
        },
        addMessage: (state, { payload }) => {
          state.messages.push(payload);
        },
    },
    extraReducers: (builder) => {
      builder.addCase(channelsActions.removeChannel, (state, action) => {
        const id = action.payload.id;
        state.messages = state.messages.filter((message) => message.channelId !== id);
      })
    }
  });

  export const { actions } = messagesSlice;

  export default messagesSlice.reducer;