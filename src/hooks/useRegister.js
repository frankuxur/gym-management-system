import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addMember } from '../redux/membersSlice'
import useSendNotification from './useSendNotification'

const useRegister = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const { sendNotification } = useSendNotification()
    const dispatch = useDispatch()    

    const register = async (inputs) => {
        const { name, email, password } = inputs

        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('email', '==', email))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            toast.error('User with this email already exists')
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

            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    
    return { loading, error, register }
}

export default useRegister