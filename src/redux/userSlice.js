import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem('user-info')),
    receipts: [],
    notifications: [],
    holidays: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { payload } = action
            state.user = payload
        },
        logout: () => ({
            ...initialState,
            user: null,
        }),
        setReceiptsAction: (state, action) => {
            const { payload } = action
            state.receipts = payload
        },
        setNotificationsAction: (state, action) => {
            const { payload } = action
            state.notifications = payload
        },
        addHolidayAction: (state, action) => {
            const { payload } = action
            state.holidays.push(payload);
        },
        removeHolidayAction: (state, action) => {
            const { payload } = action
            state.holidays = state.holidays.filter(({ id }) => id !== payload)
        },
        updateHolidayAction: (state, action) => {
            const { payload } = action
            state.holidays = state.holidays.map(holiday => {
                if (holiday.id === payload.id) {
                    return payload
                }
                return holiday
            })
        },
        setHolidaysAction: (state, action) => {
            const { payload } = action
            state.holidays = payload
        },
    }
})

export const { login, logout, setReceiptsAction, setNotificationsAction, addHolidayAction, removeHolidayAction, updateHolidayAction, setHolidaysAction } = userSlice.actions
export default userSlice.reducer