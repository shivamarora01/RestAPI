import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [carData,setCarData] = useState(null)
  const [isButtonClicked,setButtonClicked] = useState(false)
  const [isButtonClicked2,setButtonClicked2] = useState(false)
  useEffect(() => {
    const fetchData = async() => {
    try {
      const response = await axios.get('/api/cars');
      if(response.status === 200){
        setCarData(response.data)
      }
      else{
        console.log("fetching data error")
      }
    } catch (error) {
      console.log(`Error ${error}`)
    }
  } 
  if(isButtonClicked === true || isButtonClicked2 === true){
    fetchData();
  }
  }, [isButtonClicked])
  const handleButtonfnc = () => {
    if(isButtonClicked === false){
      setButtonClicked(true)
    }
    else{
      setButtonClicked(false)
      setCarData(null)
    }
  }

  return (
    <>
     <div className="app">
      <button onClick={handleButtonfnc} >Cars Brand</button>
      <ul>
        {carData && carData.map(car => (
          <li key = {car.id}>
            <h3>{car.Brand}</h3>
          </li>
        ))}
      </ul>
     </div>
    </>
  )
}

export default App
