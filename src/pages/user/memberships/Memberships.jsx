import './memberships.css'

const Memberships = () => {
  return (
    <div className="memberships">
      <article className="membership-card">
        <header>
          <i className="iconoir-snow-flake icon"></i>
          <div>core</div>
        </header>

        <ul>
          <li><i className="iconoir-check icon"></i>Gym access during working hours</li>
          <li><i className="iconoir-check icon"></i>Free locker</li>
          <li><i className="iconoir-check icon"></i>1 group fitness class/month</li>
          <li><i className="iconoir-check icon"></i>Cardio and strength equipment</li>
          <li><i className="iconoir-check icon"></i>Basic trainer consultation</li>
        </ul>

        <h3>₹3000/mo</h3>
      </article>

      <article className="membership-card">
        <header>
          <i className="iconoir-flash icon"></i>
          <div>pro</div>
        </header>

        <ul>
          <li><i className="iconoir-check icon"></i>All Core benefits</li>
          <li><i className="iconoir-check icon"></i>Unlimited group classes</li>
          <li><i className="iconoir-check icon"></i>Premium equipment access</li>
          <li><i className="iconoir-check icon"></i>2 personal training sessions/month</li>
          <li><i className="iconoir-check icon"></i>10% off on supplements/merchandise</li>
          <li><i className="iconoir-check icon"></i>Personalized fitness plan</li>
        </ul>

        <h3>₹3800/mo</h3>
      </article>

      <article className="membership-card">
        <header>
          <i className="iconoir-fire-flame icon"></i>
          <div>elite</div>
        </header>

        <ul>
          <li><i className="iconoir-check icon"></i>All Pro benefits</li>
          <li><i className="iconoir-check icon"></i>Unlimited personal training</li>
          <li><i className="iconoir-check icon"></i>Priority booking for classes/equipment</li>
          <li><i className="iconoir-check icon"></i>Free fitness tracker</li>
          <li><i className="iconoir-check icon"></i>Elite-only zones</li>
          <li><i className="iconoir-check icon"></i>20% off on supplements/merchandise</li>
          <li><i className="iconoir-check icon"></i>Free entry to gym events</li>
        </ul>

        <h3>₹4000/mo</h3>
      </article>
    </div>
  )
}

export default Memberships