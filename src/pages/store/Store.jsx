import { Link } from 'react-router-dom'
import './store.css'
import products from '../../assets/products.json'

// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Store = () => {

  // gsap stagger
  useGSAP(() => {
    if (products.length) {
        gsap.from('.supplement', {
          opacity: 0,
          y: 4,
          duration: 0.8,
          stagger: {
            amount: 1,
            from: 'beginning',
          },
          ease: 'power2.inOut',
        })
    }
  }, [products])

  return (
    <div className="store">
        <h3 className="store__title">
            <div className="iconoir-bag icon"></div>
            <span>store</span>
        </h3>

        
            <div className="supplements">
                {!!products.length && products.map(({ id, title, text, image }, i) => (
                    <article key={id} className="supplement">
                        {image ? (
                            <img src={image} alt={title} className="supplement__image" />
                        ) : (
                            <div className="supplement__placeholder"></div>
                        )}

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