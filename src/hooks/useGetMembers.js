import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useDispatch } from "react-redux"
import { setMembers } from '../redux/membersSlice'
import toast from "react-hot-toast"

const useGetMembers = () => {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch() 

  useEffect(() => {
    const getMembers = async () => {
      setLoading(true)

      try {
        const membersCollectionRef = collection(firestore, 'users')
        const q = query(membersCollectionRef, where('role', '==', 'member'))
        const querySnapshot = await getDocs(q)

        const members = []
        querySnapshot.forEach(doc => {
          members.push({
            ...doc.data(),
          })
        })

        members.sort((a, b) => a.expiryDate - b.expiryDate)
        
        // check if currentMembership of each member has expired, if yes set it to empty string("")

        dispatch(setMembers(members))
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        dispatch(setMembers([]))
      } finally {
        setLoading(false)
      }
    }

    getMembers()
  }, [])  

  return { loading }
}

export default useGetMembers