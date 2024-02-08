import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import  ProductOverviewTwo  from './compo/Card'

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
  }, [isButtonClicked,isButtonClicked2])
  const handleButtonfnc = () => {
    if(isButtonClicked === false){
      setButtonClicked(true)
    }
    else{
      setButtonClicked(false)
      setCarData(null)
    }
  }
  const handleButtonfnc2 = () => {
    if(isButtonClicked2 === false){
      setButtonClicked2(true)
    }
    else{
      setButtonClicked2(false)
      setCarData(null)
    }
  }
  const brand = carData? carData.find((car)=> car.id === 2).Brand:null;

  return (
    <>
     <div className="app">
      <button onClick={handleButtonfnc} className='bg-green-500' >Cars Brand</button>
      <ul>
        {carData && carData.map(car => (
          <li key = {car.id}>
            <h3>{car.Brand}</h3>
          </li>
        ))}
      </ul>
     </div>
     <div className="app">
      <button onClick={handleButtonfnc2} className='bg-red-700' >Cars Model</button>
      <ul>
        {carData && carData.map(car => (
          <li key = {car.id}>
            <h3>{car.Model}</h3>
          </li>
        ))}
      </ul>
     </div>
     <ProductOverviewTwo Brand = {brand}/>
    </>
  )
}

export default App
