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

        {activeMembers.length ? (
            <ul className="members__group active">
                {activeMembers.map((member) => (
                    <li key={member?.uid} className="member">
                        <div className="member__badge"></div>

                        <div className="member__name">
                            <div>{member?.name}</div>
                            <div className="member__email">{member?.email}</div>
                        </div>

                        <div className="member__date">
                            <div className="member__expiry">
                                <i className="iconoir-calendar icon"></i>
                                {formatDate(member?.expiryDate)}
                            </div>

                            <div className="line"></div>

                            <div className="member__days-left">{daysLeft(member?.expiryDate)}</div>
                        </div>

                        <div className="line"></div>

                        <div className='member__buttons'>
                            <Link to={`../receipts/${member?.uid}`} className="member__button">
                                <span className='icon'>₹</span>
                            </Link>

                            <Link to={`../update/${member?.uid}`} className="member__button">
                                <i className="iconoir-edit-pencil icon"></i>
                            </Link>

                            <Link to={`../notifications/${member?.uid}`} className="member__button">
                                <i className="iconoir-message icon"></i>
                            </Link>

                            <button onClick={() => handleDelete(member?.uid)} className="member__button">
                                <i className="iconoir-trash icon"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null}

        {closingMembers.length ? (
            <ul className="members__group closing">
                {closingMembers.map((member) => (
                    <li key={member?.uid} className="member">
                        <div className="member__badge"></div>

                        <div className="member__name">
                            <div>{member?.name}</div>
                            <div className="member__email">{member?.email}</div>
                        </div>

                        <div className='member__buttons'>
                            <Link to={`../receipts/${member?.uid}`} className="member__button">
                                <span className='icon'>₹</span>
                            </Link>

                            <button onClick={() => assignMembership(member)} className="member__button">
                                <i className="iconoir-plus icon"></i>
                            </button>

                            <Link to={`../update/${member?.uid}`} className="member__button">
                                <i className="iconoir-edit-pencil icon"></i>
                            </Link>

                            <Link to={`../notifications/${member?.uid}`} className="member__button">
                                <i className="iconoir-message icon"></i>
                            </Link>

                            <button onClick={() => handleDelete(member?.uid)} className="member__button">
                                <i className="iconoir-trash icon"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null}

        {inactiveMembers.length ? (
            <ul className="members__group inactive">
                {inactiveMembers.map((member) => (
                    <li key={member?.uid} className="member">
                        <div className="member__badge"></div>

                        <div className="member__name">
                            <div>{member?.name}</div>
                            <div className="member__email">{member?.email}</div>
                        </div>

                        <div className='member__buttons'>
                            <Link to={`../receipts/${member?.uid}`} className="member__button">
                                <span className='icon'>₹</span>
                            </Link>

                            <button onClick={() => assignMembership(member)} className="member__button">
                                <i className="iconoir-plus icon"></i>
                            </button>

                            <Link to={`../update/${member?.uid}`} className="member__button">
                                <i className="iconoir-edit-pencil icon"></i>
                            </Link>

                            <Link to={`../notifications/${member?.uid}`} className="member__button">
                                <i className="iconoir-message icon"></i>
                            </Link>

                            <button onClick={() => handleDelete(member?.uid)} className="member__button">
                                <i className="iconoir-trash icon"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null}

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