import { useState } from "react"
import { firestore } from "../firebase/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { removeMember } from "../redux/membersSlice"
 
const useDeleteMember = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const deleteMember = async (uid, setShowModal) => {
        if (loading) return 

        setLoading(true)

        try {
            const userDocRef = doc(firestore, 'users', uid)
            await deleteDoc(userDocRef)         

            dispatch(removeMember(uid))

            toast.success('Member deleted successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            setShowModal(false)
        }
    }

    return { loading, deleteMember }
}

export default useDeleteMember