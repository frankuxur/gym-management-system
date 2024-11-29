import './holidays.css'

const Holidays = () => {
  return (
    <div className="holidays">
        <h2 className="holidays__title">
            <span>2024</span>
            <div className="line"></div>
        </h2>

        <ul className="holidays__list">
            <li className="holiday">
                <span>•</span>
                <div className="holiday__date">26/11</div>
                <div className="line"></div>
                <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            </li>
            <li className="holiday">
                <span>•</span>
                <div className="holiday__date">26/11</div>
                <div className="line"></div>
                <p className="">Lorem ipsum dolor sit</p>
            </li>
            <li className="holiday">
                <span>•</span>
                <div className="holiday__date">26/11</div>
                <div className="line"></div>
                <p className="">Lorem ipsum</p>
            </li>
            <li className="holiday">
                <span>•</span>
                <div className="holiday__date">26/11</div>
                <div className="line"></div>
                <p className="">Lorem ipsum dolor sit amet</p>
            </li>
            <li className="holiday">
                <span>•</span>
                <div className="holiday__date">26/11</div>
                <div className="line"></div>
                <p className="">Lorem</p>
            </li>
        </ul>
    </div>
  )
}

export default Holidays