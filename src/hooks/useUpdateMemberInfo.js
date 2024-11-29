import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { firestore } from "../firebase/firebase"
import { updateMemberName } from "../redux/membersSlice"

const useUpdateUserInfo = () => {
    const [loading, setLoading] = useState(false)
    const role = useSelector(state => state.user.user.role)
    const dispatch = useDispatch()

    const updateUserInfo = async (data) => {
        if (role !== 'admin') return

        setLoading(true)

        try {
            const {
                name,
                uid,
            } = data
            
            const userDocRef = doc(firestore, 'users', uid)
            await updateDoc(userDocRef, { name })

            dispatch(updateMemberName({ uid, name }))
            toast.success('Name updated successfully')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { updateUserInfo, loading }
}

export default useUpdateUserInfo