import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setNotificationsAction } from "../redux/userSlice"

const useGetNotifications = () => {
  const [loading, setLoading] = useState(true)
  const { uid } = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.user.notifications)

  useEffect(() => {
    const getNotifications = async () => {

      // if the redux store already has notifications stored in it, return
      if (notifications.length) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const notificationsCollectionRef = collection(firestore, 'notifications')
        const q = query(notificationsCollectionRef, where('receiver', '==', uid))
        const querySnapshot = await getDocs(q)

        const notifications = []
        querySnapshot.forEach(doc => {
          notifications.push({
            ...doc.data(),
            id: doc.id
          })
        })

        notifications.sort((a, b) => b.createdAt - a.createdAt)

        dispatch(setNotificationsAction(notifications))
        
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getNotifications()
  }, [])  

  return { loading }
}

export default useGetNotifications