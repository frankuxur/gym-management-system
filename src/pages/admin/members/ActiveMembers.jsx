import { Link } from "react-router-dom"
import daysLeft from "../../../utils/daysLeft"
import formatDate from "../../../utils/formatDate"

const ActiveMembers = ({ activeMembers, handleDelete }) => {
  return (
    <>
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
    </>
  )
}

export default ActiveMembers