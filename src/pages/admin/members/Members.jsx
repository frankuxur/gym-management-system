import { Link } from 'react-router-dom'
import './members.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import Modal from '../../../components/modal/Modal'
import useDeleteMember from '../../../hooks/useDeleteMember'
import Loader from '../../../components/loader/Loader'
import { removeMember } from '../../../redux/membersSlice'
import formatDate from '../../../utils/formatDate'
import daysLeft from '../../../utils/daysLeft'
import formatText from '../../../utils/formatText'
import useGetFilteredMembers from '../../../hooks/useGetFilteredMembers'
import useGetMembers from '../../../hooks/useGetMembers'

// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ActiveMembers from './ActiveMembers'
import ClosingMembers from './ClosingMembers'
import InactiveMembers from './InactiveMembers'

const Members = () => {

  const [showModal, setShowModal] = useState(false)
  const { loading } = useGetMembers()
  const { activeMembers, inactiveMembers, closingMembers, searchQuery, setSearchQuery } = useGetFilteredMembers()
  const [selectedMember, setSelectedMember] = useState({})
  const { deleteMember } = useDeleteMember()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
     
  // open the modal used for membership assignment    
  const assignMembership = (member) => {
    setShowModal(true)
    setSelectedMember(member)
  }

  // delete member from database and state
  const handleDelete = (uid) => {
    deleteMember(uid)
    dispatch(removeMember(uid))
  }

  // focus on input when componenet renders   
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // gsap stagger
  useGSAP(() => {
    if (activeMembers.length && !loading) {
        gsap.from('.member', {
          opacity: 0,
          x: 4,
          duration: 0.8,
          stagger: {
            amount: 2,
            from: 'beginning',
          },
          ease: 'power2.inOut',
        })
    }
  }, [loading])

  return (
    <div className="members">
        <div className="members__search">
            <i className="iconoir-search icon"></i>
            <input 
                type="text" 
                className="members__input" 
                placeholder='Search for a member'
                value={searchQuery}
                onChange={e => setSearchQuery(formatText(e.target.value))}
                ref={inputRef}
            />
        </div>

        {/* list of members grouped by active, closing & inactive */}
        <ActiveMembers activeMembers={activeMembers} handleDelete={handleDelete} />

        <ClosingMembers closingMembers={closingMembers} handleDelete={handleDelete} />

        <InactiveMembers inactiveMembers={inactiveMembers} assignMembership={assignMembership} handleDelete={handleDelete} />

        {loading && <Loader color='new-3' />}

        {/* render this if there's text in the search query, and there are members, but no members' name match the search query */}
        {!!searchQuery.trim().length && !loading && !activeMembers.length && !inactiveMembers.length && !closingMembers.length && (
          <h2 className='empty'>sorry, we couldn't find who you're looking for</h2>
        )}

        {showModal && <Modal type={'membership'} setShowModal={setShowModal} member={selectedMember} />}
    </div>
  )
}

export default Members