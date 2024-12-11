import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setReceiptsAction } from "../redux/userSlice"

const useGetMemberReceipts = (id) => {
  const [loading, setLoading] = useState(true)
  const [member, setMember] = useState(true)
  const { role } = useSelector(state => state.user.user)
  const receipts = useSelector(state => state.user.receipts)
  const dispatch = useDispatch()

  useEffect(() => {
    const getReceipts = async () => {

      // if the user is a 'member' & the redux store already has receipts stored in it, return
      if (role === 'member' && receipts.length) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        // fetch receipts for the corresponding member
        const receiptsCollectionRef = collection(firestore, 'receipts')
        const q = query(receiptsCollectionRef, where('memberId', '==', id))
        const querySnapshot = await getDocs(q)

        // fetch the corresponding member name & email
        const userDocRef = doc(firestore, 'users', id) // get reference of user from firestore collection
        const userDocSnap = await getDoc(userDocRef)
        const { name, email } = userDocSnap.data()
        setMember({ name, email })

        const receiptsArray = []
        querySnapshot.forEach(doc => {
          receiptsArray.push({
            ...doc.data(),
            id: doc.id
          })
        })
        
        dispatch(setReceiptsAction(receiptsArray))

      } catch (error) {
        // if no such member is found with the "id" passed
        if (error.message === `Cannot destructure property 'name' of 'userDocSnap.data(...)' as it is undefined.`) {
          dispatch(setReceiptsAction([]))
          setMember({ name: 'member not found', email: '' })
        } else {
          toast.error(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    getReceipts()
  }, [])  

  return { member, loading }
}

export default useGetMemberReceipts