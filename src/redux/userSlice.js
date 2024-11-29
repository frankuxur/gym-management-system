import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem('user-info')),
    receipts: [],
    notifications: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { payload } = action
            state.user = payload
        },
        logout: () => initialState,
        setReceiptsAction: (state, action) => {
            const { payload } = action
            state.receipts = payload
        },
        setNotificationsAction: (state, action) => {
            const { payload } = action
            state.notifications = payload
        }
    }
})

export const { login, logout, setReceiptsAction, setNotificationsAction } = userSlice.actions
export default userSlice.reducer