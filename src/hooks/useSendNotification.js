import { firestore } from '../firebase/firebase'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useState } from 'react'

const useSendNotification = () => {
    const [loading, setLoading] = useState(false)

    const sendNotification = async (data) => {
        const { title, text, uid } = data
        if (!title.trim() || !text.trim()) {
            toast.error('Fill all fields')
            return
        }

        if (loading) return

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
            toast.error(error.message, { icon: '⚠️' })
        } finally {
            setLoading(false)
        }
    }
    
    return { loading, sendNotification }
}

export default useSendNotification