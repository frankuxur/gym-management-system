import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    members: []
}

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers: (state, action) => {
            const { payload } = action
            state.members = payload
        },
        addMember: (state, action) => {
            const { payload } = action
            state.members = [...state.members, payload]
        },
        removeMember: (state, action) => {
            const { payload } = action
            state.members = state.members.filter(({ uid }) => uid !== payload)
        },
        assignMembershipAction: (state, action) => {
            const { payload } = action
            state.members = state.members.map(member => {
                if (member.uid === payload.uid) {
                    return {
                        ...member,
                        currentMembership: payload.currentMembership,
                        expiryDate: payload.expiryDate,
                    }
                }
                return member
            })
        },
        updateMemberName: (state, action) => {
            const { payload } = action
            state.members = state.members.map(member => {
                if (member.uid === payload.uid) {
                    return {
                        ...member,
                        name: payload.name
                    }
                }
                return member
            })
        },
        resetMembers: () => initialState,
    }
})

export const { setMembers, addMember, removeMember, assignMembershipAction, resetMembers, updateMemberName } = membersSlice.actions
export default membersSlice.reducer