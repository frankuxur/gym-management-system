import { useEffect, useState } from "react"
import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useDispatch, useSelector } from "react-redux"
import { setMembers } from '../redux/membersSlice'
import toast from "react-hot-toast"

const useGetMembers = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch() 
  const members = useSelector(state => state.members.members)

  useEffect(() => {
    const getMembers = async () => {
      // if redux store already has members stored in it, the function will not execute any further
      if (members.length) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const membersCollectionRef = collection(firestore, 'users')
        const q = query(membersCollectionRef, where('role', '==', 'member'))
        const querySnapshot = await getDocs(q)

        const members = []
        const batch = writeBatch(firestore)
        const currentDate = Date.now()

        querySnapshot.forEach((docSnapshot) => {
          const memberData = docSnapshot.data()

          // check if expiryDate has passed
          if (memberData.expiryDate < currentDate) {
            const memberRef = doc(firestore, "users", docSnapshot.id)
            // set expiryDate & currentMembership to null for this member
            batch.update(memberRef, {
              expiryDate: null,
              currentMembership: null,
            })
            memberData.expiryDate = null
            memberData.currentMembership = null
          }

          members.push({
            ...memberData,
          })
        })

        // commit batch updates
        if (!batch._mutations.length === 0) {
          await batch.commit()
        }

        // sort members by expiryDate
        members.sort((a, b) => a.expiryDate - b.expiryDate)

        dispatch(setMembers(members))
      } catch (error) {
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