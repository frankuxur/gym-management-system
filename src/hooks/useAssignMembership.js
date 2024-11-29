import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../firebase/firebase"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { assignMembershipAction } from "../redux/membersSlice"

const useAssignMembership = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const assignMembership = async (data) => {
        if (loading) return

        const { member, membership } = data
        const { uid } = member
        setLoading(true)

        try {
            // create receipt
            let amount
            if (membership === 'core') amount = 3000
            else if (membership === 'pro') amount = 3800
            else amount = 4000

            const newReceipt = {
                createdAt: Date.now(),
                memberId: uid,
                membership,
                expiryDate: Date.now() + (30 * 24 * 60 * 60 * 1000),
                amount,
            }
            
            const receiptsCollectionRef = collection(firestore, 'receipts')
            const receiptDocRef = await addDoc(receiptsCollectionRef, newReceipt)

            // update user info: currentMembership, expiryDate, receipts
            const userDocRef = doc(firestore, 'users', uid)
            await updateDoc(userDocRef, { receipts: arrayUnion(receiptDocRef.id), currentMembership: membership, expiryDate: newReceipt.expiryDate })

            dispatch(assignMembershipAction({ uid, currentMembership: membership, expiryDate: newReceipt.expiryDate }))
            toast.success('Membership assigned successfully!')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { assignMembership, loading }
}

export default useAssignMembership