import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, firestore } from '../firebase/firebase'
import { useDispatch } from "react-redux"
import { login } from "../redux/userSlice"
import { doc, getDoc } from "firebase/firestore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const useLogin = () => {
    const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const loginUser = async (inputs) => {
        const { email, password } = inputs

        if (loading) return

        setLoading(true)

        try {
            const userCred = await signInWithEmailAndPassword(email, password)

            // if login is successfull
            if (userCred) {
                const userDocRef = doc(firestore, 'users', userCred.user.uid) // get reference of user from firestore collection
                const userDocSnap = await getDoc(userDocRef)
                localStorage.setItem('user-info', JSON.stringify(userDocSnap.data())) // set user's info in local storage
                dispatch(login(userDocSnap.data())) // set user's info in redux store
                toast.success('You are logged in') 
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    return { loginUser, loading, error }
}

export default useLogin