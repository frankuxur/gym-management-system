import { NavLink, Outlet } from 'react-router-dom'
import './diets.css'
import diets from '../../assets/diets.json'
import { useState } from 'react'

const Diets = () => {

   const links = diets.map(({ id, title }) => ({ id, title }))     

   const [showAside, setShowAside] = useState(true)
    
  return (
    <div className="diets">
        <aside className={`diets__aside ${showAside ? 'active' : ''}`}>

            <h2 className='diets__title'>
                <span>diets list</span>

                <div className="line">
                    <button onClick={() => setShowAside(false)} className="diets__button">
                        <i className="iconoir-xmark icon"></i>
                    </button>
                </div>
            </h2>

            <ul className='diets__list'>
                {links.map(({ id, title }) => (
                    <li key={id} onClick={() => setShowAside(false)}>
                        <div className='dot'></div>
                        <NavLink to={`${id}`} key={id}className='diets__link'>{title}</NavLink>
                    </li>
                ))}
            </ul>
        </aside>

        <div className="diet">
            <button onClick={() => setShowAside(true)} className="form__button">
                <span>show list</span>
                <i className="iconoir-nav-arrow-right icon"></i>
            </button>
            <Outlet />
        </div>
    </div>
  )
}

export default Diets