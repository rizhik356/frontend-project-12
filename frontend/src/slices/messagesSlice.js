import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
  };

  const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        initMessages: (state, { payload }) => {
            state.messages = payload.messages;
        },
        addMessage: (state, { payload }) => {
          state.messages.push(payload);
          console.log(current(state))
        },
    }
  });

  export const { actions } = messagesSlice;

  export default messagesSlice.reducer;