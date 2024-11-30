import { firestore } from '../firebase/firebase'
import { addDoc, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useSendNotification = () => {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const sendNotification = async (data) => {
        if (loading) return

        const { title, text, uid } = data
        setLoading(true)

        try {
            // create notification
            const newNotification = {
                createdAt: Date.now(),
                title,
                text,
                receiver: uid,
            }

            const notificationsCollectionRef = collection(firestore, 'notifications')
            const notificationsDocRef = await addDoc(notificationsCollectionRef, newNotification)
            
            // update user info: notifications
            const userDocRef = doc(firestore, 'users', uid)
            await updateDoc(userDocRef, { notifications: arrayUnion(notificationsDocRef.id) })

            toast.success('Notification sent successfully')                
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, sendNotification }
}

export default useSendNotification