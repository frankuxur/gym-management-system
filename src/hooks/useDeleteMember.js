import { useState } from "react"
import { firestore } from "../firebase/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"
 
const useDeleteMember = () => {
    const [loading, setLoading] = useState(false)

    const deleteMember = async (uid) => {
        if (loading) return 

        setLoading(true)

        try {
            const userDocRef = doc(firestore, 'users', uid)
            await deleteDoc(userDocRef)         

            toast.success('Member deleted successfully')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteMember }
}

export default useDeleteMember