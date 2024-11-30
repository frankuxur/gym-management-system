import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { firestore } from "../firebase/firebase"
import { addHolidayAction, removeHolidayAction, setHolidaysAction, updateHolidayAction } from "../redux/userSlice"

// add a holiday
export const useAddHoliday = () => {
    const [loading, setLoading] = useState(false)
    const role = useSelector(state => state.user.user.role)
    const dispatch = useDispatch()

    const addHoliday = async (holiday, setShowModal) => {
        if (role !== 'admin') return
        if (loading) return

        setLoading(true)

        try {

            const holidaysCollectionRef = collection(firestore, 'holidays')
            const holidayDocRef = await addDoc(holidaysCollectionRef, holiday)
            
            // Add holiday with the Firestore ID to Redux state
            const newHoliday = { id: holidayDocRef.id, ...holiday }
            dispatch(addHolidayAction(newHoliday))

            toast.success('Holiday added successfully')

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            setShowModal(false)
        }
    }

    return { addHoliday, loading }
}


// fetch holidays
export const useGetHolidays = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const  holidays = useSelector(state => state.user.holidays)
  
    useEffect(() => {
      const getHolidays = async () => {
        if (holidays.length) {
            setLoading(false)
            return
        }

        // if (holidays.length) return

        setLoading(true)
  
        try {
            const holidaysCollectionRef = collection(firestore, 'holidays')
            const querySnapshot = await getDocs(holidaysCollectionRef)
    
            const holidays = []
            querySnapshot.forEach(doc => {
                holidays.push({
                ...doc.data(),
                id: doc.id
                })
            })
    
            dispatch(setHolidaysAction(holidays))
          
        } catch (error) {
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
      }
  
      getHolidays()
    }, [])  
  
    return { loading }   
}


// delete a holiday
export const useDeleteHoliday = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const deleteHoliday = async (id) => {
        if (loading) return 

        setLoading(true)

        try {
            const holidayDocRef = doc(firestore, 'holidays', id)
            await deleteDoc(holidayDocRef)    
            
            dispatch(removeHolidayAction(id))

            toast.success('Holiday deleted successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteHoliday }
}


// update holiday
export const useUpdateHoliday = () => {
    const [loading, setLoading] = useState(false)
    const role = useSelector(state => state.user.user.role)
    const dispatch = useDispatch()

    const updateHoliday = async (data, setShowModal) => {
        if (role !== 'admin') return

        setLoading(true)

        try {
            const { id, ...info } = data
            
            const holidayDocRef = doc(firestore, 'holidays', id)
            await updateDoc(holidayDocRef, info)

            dispatch(updateHolidayAction(data))
            toast.success('Holiday updated successfully')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            setShowModal(false)
        }
    }

    return { updateHoliday, loading }
}