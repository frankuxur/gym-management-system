import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../firebase/firebase"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { assignMembershipAction } from "../redux/membersSlice"
import useSendNotification from "./useSendNotification"

const useAssignMembership = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { sendNotification } = useSendNotification()

    const assignMembership = async (data, setShowModal) => {
        if (loading) return

        const { member, membership } = data
        const { uid } = member
        setLoading(true)

        try {
            // create receipt
            let amount
            if (membership.toLowerCase() === 'core') amount = 3000
            else if (membership.toLowerCase() === 'pro') amount = 3800
            else amount = 4000

            const newReceipt = {
                createdAt: Date.now(),
                memberId: uid,
                membership,
                expiryDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // set expiry date at 30 days from current date
                amount,
            }
            
            const receiptsCollectionRef = collection(firestore, 'receipts')
            const receiptDocRef = await addDoc(receiptsCollectionRef, newReceipt)

            // update user info: currentMembership, expiryDate, receipts
            const userDocRef = doc(firestore, 'users', uid)
            await updateDoc(userDocRef, { receipts: arrayUnion(receiptDocRef.id), currentMembership: membership, expiryDate: newReceipt.expiryDate })

            dispatch(assignMembershipAction({ uid, currentMembership: membership, expiryDate: newReceipt.expiryDate }))
            toast.success('Membership assigned successfully!')

            // send notification
            const notification = {
                title: `${membership} membership subscription`,
                text: `Kudos for subscribing to our ${membership} membership!`,
                uid,
            }
            sendNotification(notification)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            setShowModal(false)
        }
    }

    return { assignMembership, loading }
}

export default useAssignMembership