import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, firestore } from '../firebase/firebase'
import { useDispatch } from "react-redux"
import { login } from "../redux/userSlice"
import { doc, getDoc } from "firebase/firestore"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const useLogin = () => {
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginUser = async (inputs) => {
        const { email, password } = inputs

        try {
            const userCred = await signInWithEmailAndPassword(email, password)
            if (userCred) {
                const userDocRef = doc(firestore, 'users', userCred.user.uid) 
                const userDocSnap = await getDoc(userDocRef)
                localStorage.setItem('user-info', JSON.stringify(userDocSnap.data()))
                dispatch(login(userDocSnap.data()))
                toast.success('You are logged in')
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    return { loginUser, loading, error }
}

export default useLogin