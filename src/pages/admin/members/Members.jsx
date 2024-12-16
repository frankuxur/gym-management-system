import './members.css'
import { useState } from 'react'
import Modal from '../../../components/modal/Modal'
import Loader from '../../../components/loader/Loader'
import formatText from '../../../utils/formatText'
import useGetFilteredMembers from '../../../hooks/useGetFilteredMembers'
import useGetMembers from '../../../hooks/useGetMembers'
import ActiveMembers from './ActiveMembers'
import ClosingMembers from './ClosingMembers'
import InactiveMembers from './InactiveMembers'

// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Members = () => {

  const [showMembershipModal, setShowMembershipModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { loading } = useGetMembers()
  const { activeMembers, inactiveMembers, closingMembers, searchQuery, setSearchQuery } = useGetFilteredMembers()
  const [selectedMember, setSelectedMember] = useState({})
     
  // open the modal used for membership assignment    
  const assignMembership = (member) => {
    setShowMembershipModal(true)
    setSelectedMember(member)
  }

  // delete member from database and state
  const handleDelete = (member) => {
    setSelectedMember(member)
    setShowDeleteModal(true)
  }

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
          autoFocus
        />
      </div>

      {/* list of members grouped by active, closing & inactive */}
      <ActiveMembers activeMembers={activeMembers} handleDelete={handleDelete} />

      <ClosingMembers closingMembers={closingMembers} handleDelete={handleDelete} />

      <InactiveMembers inactiveMembers={inactiveMembers} assignMembership={assignMembership} handleDelete={handleDelete} />

      {loading && <Loader color='text-1' />}

      {/* render this if there's text in the search query, and there are members, but no members' name match the search query */}
      {!!searchQuery.trim().length && !loading && !activeMembers.length && !inactiveMembers.length && !closingMembers.length && (
        <h2 className='empty'>sorry, we couldn't find who you're looking for</h2>
      )}

      {showMembershipModal && <Modal type={'membership'} setShowModal={setShowMembershipModal} member={selectedMember} />}
      {showDeleteModal && <Modal type={'delete'} setShowModal={setShowDeleteModal} member={selectedMember} />}
    </div>
  )
}

export default Members