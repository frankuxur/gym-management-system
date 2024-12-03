import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import divideMembers from "../helper/divideMembers"

const useGetFilteredMembers = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const allMembers = useSelector(state => state.members.members)
    const [activeMembers, setActiveMembers] = useState([])
    const [inactiveMembers, setInactiveMembers] = useState([])
    const [closingMembers, setClosingMembers] = useState([])

    useEffect(() => {
        let foo
        if (searchQuery.trim()) {
            const filteredMembers = allMembers.filter(({ name }) => name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
            foo = filteredMembers
        } else {
            foo = allMembers
        }
        
        const { activeMembers: a, inactiveMembers: i, closingMembers: c } = divideMembers(foo)
        setActiveMembers(a)
        setInactiveMembers(i)
        setClosingMembers(c)
    }, [searchQuery, allMembers])

    return { activeMembers, inactiveMembers, closingMembers, searchQuery, setSearchQuery }
}

export default useGetFilteredMembers