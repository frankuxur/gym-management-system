import { useParams } from "react-router-dom"
import diets from '../../assets/diets.json'

const Diet = () => {
  
  const { id } = useParams()
  const diet = diets.find(diet => diet.id === id)
  const { text, title } = diet

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