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
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum dolor</li>
        </ul>

        <h3>₹3000/mo</h3>
      </article>

      <article className="membership-card">
        <header>
          <i className="iconoir-flash icon"></i>
          <div>pro</div>
        </header>

        <ul>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum dolor</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum, dolor sit amet consectetur adipisicing</li>
        </ul>

        <h3>₹3800/mo</h3>
      </article>

      <article className="membership-card">
        <header>
          <i className="iconoir-fire-flame icon"></i>
          <div>elite</div>
        </header>

        <ul>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum dolor</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum dolor</li>
          <li><i className="iconoir-check icon"></i>Lorem, ipsum dolor</li>
          <li><i className="iconoir-check icon"></i>Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
        </ul>

        <h3>₹4000/mo</h3>
      </article>
    </div>
  )
}

export default Memberships