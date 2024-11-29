import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setReceiptsAction } from "../redux/userSlice"

const useGetMemberReceipts = (id) => {
  const [loading, setLoading] = useState(true)
  const { role } = useSelector(state => state.user.user)
  const receipts = useSelector(state => state.user.receipts)
  const dispatch = useDispatch()

  useEffect(() => {
    const getReceipts = async () => {

      if (role === 'member' && receipts.length) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const receiptsCollectionRef = collection(firestore, 'receipts')
        const q = query(receiptsCollectionRef, where('memberId', '==', id))
        const querySnapshot = await getDocs(q)

        const receiptsArray = []
        querySnapshot.forEach(doc => {
          receiptsArray.push({
            ...doc.data(),
            id: doc.id
          })
        })
        dispatch(setReceiptsAction(receiptsArray))
        
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getReceipts()
  }, [])  

  return { loading }
}

export default useGetMemberReceipts