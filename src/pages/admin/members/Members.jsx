import { Link } from 'react-router-dom'
import './members.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Modal from '../../../components/modal/Modal'
import divideMembers from '../../../helper/divideMembers'
import useDeleteMember from '../../../hooks/useDeleteMember'
import Loader from '../../../components/loader/Loader'
import { removeMember } from '../../../redux/membersSlice'
import formatDate from '../../../utils/formatDate'
import daysLeft from '../../../utils/daysLeft'

const Members = () => {

  const [showModal, setShowModal] = useState(false)

  const members = useSelector(state => state.members.members)
  const { activeMembers, inactiveMembers, closingMembers } = divideMembers(members)
  const [selectedMember, setSelectedMember] = useState({})
  const { deleteMember, loading } = useDeleteMember()
  const dispatch = useDispatch()

  const assignMembership = (member) => {
    setShowModal(true)
    setSelectedMember(member)
  }

  const handleDelete = (uid) => {
    deleteMember(uid)
    dispatch(removeMember(uid))
  }

  return (
    <div className="members">
        <div className="members__search">
            <i className="iconoir-search icon"></i>
            <input 
                type="text" 
                className="members__input" 
                placeholder='Search for a member'
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

                        <Link to={`../receipts/${member?.uid}`} className="member__button">
                            {/* <i className="iconoir-database-script icon"></i> */}
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
                    </li>
                ))}
            </ul>
        ) : null}

        {!members.length && <Loader color='new-3' />}

        {showModal && <Modal type={'membership'} setShowModal={setShowModal} member={selectedMember} />}
    </div>
  )
}

export default Members