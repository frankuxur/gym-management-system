import { Link, useParams } from 'react-router-dom'
import products from '../../assets/products.json'

const Product = () => {
  
  const { id } = useParams()  
  const product = products.find(product => product.id === id)
  const { image, title, text, inStock } = product || {}

  return (
    <div className="product">
        <Link to={'../store'} className="product__back-button">
            <i className="iconoir-nav-arrow-left icon"></i>
        </Link>

        <div className="product__body">
            <img src={image} alt={title} className="product__image" />

            <div className="product__details">
                <h1 className="product__title">{title}</h1>

                <div className="product__in-stock">
                    <span>{inStock ? 'available in stock' : 'out of stock'}</span>
                    <span className="line"></span>
                </div>

                <div className="product__text">{text}</div>
            </div>
        </div>
    </div>
  )
}

export default Product