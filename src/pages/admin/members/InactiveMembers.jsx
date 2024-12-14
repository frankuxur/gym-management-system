import React from 'react'
import { Link } from 'react-router-dom'

const InactiveMembers = ({ inactiveMembers, assignMembership, handleDelete }) => {
  return (
    <>
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

                            <button onClick={() => handleDelete(member)} className="member__button">
                                <i className="iconoir-trash icon"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        ) : null}
    </>
  )
}

export default InactiveMembers