import './loader.css'

const Loader = ({ color }) => {
  let style = {}
  if (color) {
    style.backgroundColor = `var(--${color})`
  }

  return (
    <div className="loader-box">
      <div style={style} className="loader"></div>
    </div>
  )
}

export default Loader