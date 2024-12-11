// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Features = () => {
  
  // gsap stagger
  useGSAP(() => {
    gsap.from('.feature__image', {
        opacity: 0,
        y: 4,
        duration: 0.8,
        stagger: {
            amount: 0.2,
            from: 'beginning',
        },
        ease: 'power2.inOut',
    })
  }, [])

  return (
    <ul className="features">
        <li className="feature">
            <img src="images/feature-1.png" alt="" className="feature__image" />
            <div>
                <div className="feature__title">digital receipts</div>
                <p className="feature__text">receive digital receipts for every subscription, ensuring a hassle-free billing process for all your gym-related transactions</p>
            </div>
        </li>

        <li className="feature">
            <img src="images/feature-2.png" alt="" className="feature__image" />
            <div>
                <div className="feature__title">memberships</div>
                <p className="feature__text">subscribe to a membership plan that aligns with your fitness goals</p>
            </div>
            </li>

        <li className="feature">
            <img src="images/feature-3.png" alt="" className="feature__image" />
            <div>
                <div className="feature__title">supplement store</div>
                <p className="feature__text">enjoy access to an online supplement store, making it easier to support your fitness journey with the right nutrition</p>
            </div>
        </li>
        
        <li className="feature">
            <img src="images/feature-4.png" alt="" className="feature__image" />
            <div>
                <div className="feature__title">notifications</div>
                <p className="feature__text">get timely notifications about important announcements from your gym, ensuring you're always informed</p>
            </div>
        </li>
    </ul>
  )
}

export default Features