import { Link } from 'react-router-dom'
import './store.css'
import products from '../../assets/products.json'

const Store = () => {

    
  return (
    <div className="store">
        <h3 className="store__title">
            <div className="iconoir-bag icon"></div>
            <span>store</span>
        </h3>

        <div className="supplements">
            {products.length && products.map(({ id, title, text, image, inStock }) => (
                <article key={id} className="supplement">
                    <img src={image} alt={title} className="supplement__image" />

                    <header className="supplement__header">
                        <div className="supplement__title">{title}</div>

                        <div>
                            <span className="supplement__text">
                                {text.substring(0, 50)}...
                            </span>
                            <span>
                                <Link to={`${id}`} className='supplement__view-link'>view details</Link>
                            </span>
                        </div>
                    </header>
                </article>
            ))}
        </div>
    </div>
  )
}

export default Store



{/* <p>
  {text.split('\n').map((item, key) => (
    <Fragment key={key}>
      {item}
      <br />
    </Fragment>
 ))}
</p> */}