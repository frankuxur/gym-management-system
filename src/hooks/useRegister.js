import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addMember } from '../redux/membersSlice'
import useSendNotification from './useSendNotification'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// custom hook to register a new user
const useRegister = () => {
    const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth)
    const { sendNotification } = useSendNotification()
    const dispatch = useDispatch()   
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const register = async (inputs) => {
        const { name, email, password } = inputs
        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error('Fill all fields')
            return
        }
        
        if (password.trim().length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        if (loading) return

        setLoading(true)

        // checking if a user with the same email already exists in the firestore collection "users"
        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)
        // if user the same email exists
        if (!querySnapshot.empty) {
            toast.error('User with this email already exists')
            setLoading(false)
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(email, password)
            if (!newUser && error) {
                toast.error(error.message)
                return
            }            
            
            if (newUser) {

                const userDoc = {
                    uid: newUser.user.uid,
                    email,
                    name,
                    currentMembership: null,
                    expiryDate: null,
                    receipts: [],
                    role: 'member',
                    createdAt: Date.now()
                }
                await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)
                dispatch(addMember(userDoc))
                toast.success('New member created successfully')

                // send welcome notification
                const notification = {
                    title: `Welcome!`,
                    text: `Hey there! Congrats on embarking on this fitness adventure with us. 🎉 Let's crush those goals together! 💪 Don't forget to subscribe to one of our memberships to unlock all the perks! 🚀`,
                    uid: newUser.user.uid
                }
                sendNotification(notification)
                navigate('../members')

            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, error, register }
}

export default useRegister