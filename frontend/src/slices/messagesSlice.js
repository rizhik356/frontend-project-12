import { createSlice } from '@reduxjs/toolkit';

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
    }
  });

  export const { actions } = messagesSlice;

  export default messagesSlice.reducer;