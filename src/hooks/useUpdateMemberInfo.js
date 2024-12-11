import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { firestore } from "../firebase/firebase"
import { updateMemberName } from "../redux/membersSlice"
import { useNavigate } from "react-router-dom"

const useUpdateUserInfo = () => {
    const [loading, setLoading] = useState(false)
    const role = useSelector(state => state.user.user.role)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateUserInfo = async (data) => {
        const { name, uid } = data

        if (role !== 'admin') return
        if (!name.trim()) {
            toast.error('Name field cannot be empty')
            return
        }

        setLoading(true)

        try {            
            const userDocRef = doc(firestore, 'users', uid)
            await updateDoc(userDocRef, { name })

            dispatch(updateMemberName({ uid, name }))
            toast.success('Name updated successfully')
            navigate('../members')
        } catch (error) {
            toast(error.message, { icon: '⚠️' })
        } finally {
            setLoading(false)
        }
    }

    return { updateUserInfo, loading }
}

export default useUpdateUserInfo