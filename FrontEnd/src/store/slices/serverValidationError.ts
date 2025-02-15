import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  errors:{},  
}

export const serverSideValidation = createSlice({
  name: 'serverValidationError',
  initialState,
  reducers: {
    setValidationErrors(state, action) {
            state.errors = action.payload;
    },
    clearValidationErrors(state) {
            state.errors = {};
    },
  },
})

// Action creators are generated for each case reducer function
export const { setValidationErrors, clearValidationErrors } = serverSideValidation.actions

export default serverSideValidation.reducer