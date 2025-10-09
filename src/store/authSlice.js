import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    username: '',
    institution: '',
    vendor: '',
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setName: (state, action) => { state.name = action.payload },
        setEmail: (state, action) => { state.email = action.payload },
        setUsername: (state, action) => { state.username = action.payload },
        setInstitution: (state, action) => { state.institution = action.payload },
        setVendor: (state, action) => { state.vendor = action.payload },
        resetAccount: () => initialState,
    },
})

export const  {
    setName,
    setEmail,
    setUsername,
    setInstitution,
    setVendor,
    resetAccount,
} = accountSlice.actions

export default accountSlice.reducer