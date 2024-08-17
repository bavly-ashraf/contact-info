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
      // getting user index using the uuid property
      const userIndex = state.value.findIndex(el => el.login.uuid == action.payload.login.uuid);
      if(userIndex != -1){
        // if user is founded edit it
        state.value[userIndex] = action.payload;
      }
    },
    deleteContact: (state, action) => {
      // deleting user by uuid
      state.value = state.value.filter(el => el.login.uuid != action.payload);
    },
  },
})

export const { addAllContacts, createContact, editContact, deleteContact } = contactsSlice.actions

export default contactsSlice.reducer