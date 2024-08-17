import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addAllContacts: (state, action) => {
      state.value = action.payload;
    },
    createContact: (state, action) => {
      state.value.push(action.payload);
    },
    editContact: (state,action) => {
      const userIndex = state.value.findIndex(el => el.login.uuid == action.payload.login.uuid);
      if(userIndex != -1){
        state.value[userIndex] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      state.value = state.value.filter(el => el.login.uuid != action.payload);
    },
  },
})

export const { addAllContacts, createContact, editContact, deleteContact } = contactsSlice.actions

export default contactsSlice.reducer