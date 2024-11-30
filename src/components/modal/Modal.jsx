import DeleteModal from './DeleteModal'
import HolidaysModal from './HolidaysModal'
import LoginModal from './LoginModal'
import MembershipModal from './MembershipModal'
import './modal.css'

const Modal = ({ type, setShowModal, member, holidayInfo }) => { 
  let title
  if (type === 'login') {
    title = 'Login'
  } else if (type === 'membership') {
    title = 'Pick a membership'
  } else if (type === 'holidays') {
    title = 'Add a holiday'
  } else if (type === 'updateHoliday') {
    title = 'Update holiday'
  }

  return (
    <div className="modal">
        <div className="modal__content">
            <header className="modal__header">
              <h2 className="modal__title">{title}</h2>

              <button className="modal__close" onClick={() => setShowModal(false)}>
                <i className="iconoir-xmark"></i>
              </button>
            </header>

            {type === 'delete' && <DeleteModal />}
            {type === 'membership' && <MembershipModal member={member} setShowModal={setShowModal} />}
            {type === 'login' && <LoginModal />}
            {type === 'holidays' && <HolidaysModal setShowModal={setShowModal} />}
            {type === 'updateHoliday' && <HolidaysModal holidayInfo={holidayInfo} setShowModal={setShowModal} />}
        </div>
    </div>
  )
}

export default Modal