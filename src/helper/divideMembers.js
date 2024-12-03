const divideMembers = (members) => {
    let activeMembers = [], inactiveMembers = [], closingMembers = []
    members.filter(member => {
        const msInADay = 24 * 60 * 60 * 1000
        const currentDate = Date.now()
        const expiryDate = member.expiryDate
        if (!expiryDate) {
            inactiveMembers.push(member)
        } else if (expiryDate) {
            const diffInMs = expiryDate - currentDate
            if ((diffInMs >= 7 * msInADay) && (diffInMs >= 0)) {
                activeMembers.push(member)
            } else if ((diffInMs < 7 * msInADay) && (diffInMs > 0)) {
                closingMembers.push(member)
            }
        } 
    })

    activeMembers.sort((a, b) => a.expiryDate - b.expiryDate)

    return { activeMembers, inactiveMembers, closingMembers }
}

export default divideMembers