import { useParams } from "react-router-dom"
import diets from '../../assets/diets.json'

// gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Diet = () => {
  
  const { id } = useParams()
  const diet = diets.find(diet => diet.id === id)
  const { text, title } = diet || {}
  
  // gsap stagger
  useGSAP(() => {
    if (diet) {
      gsap.from('.diet > *', {
        opacity: 0,
        x: 4,
        duration: 0.8,
        stagger: {
          amount: 0.1,
          from: 'beginning',
        },
        ease: 'power2.inOut',
      })
    }
  }, [diet])
  

  if (!diet) {
    return (
      <h2 className='empty'>
        <span>oopsies! that diet doesn't exist, try one from the list</span>
      </h2>
    )
  }

  return (
    <>
      <h1 className="diet__title">{title}</h1>
      <div className="diet__paragraphs">
        {text.split('\n').map((item, key) => (
          <p key={key}>
            {item}
          </p>
        ))}
      </div>
    </>
  )
}

export default Diet