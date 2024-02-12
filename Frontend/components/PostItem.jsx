import { useEffect, useState } from 'react'
import axios from 'axios'

function PostItem() {
  const [jsonData , setJsonData] = useState(null)
useEffect(()=>{
  console.log(jsonData)
  const fetchData = async () => {
    try {
      const response =await axios.get('/api/users');
      console.log(response)
      if(response.status === 200) {
        setJsonData(response.data)
      }
      else{
        console.log("failed to fetch data")
      }
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }
  fetchData();
},[])

  return (
    <>
      <div className="app">
        <ul>
          { jsonData && jsonData.map(user => (
            <li key={user.idCategory}>
              <strong>{user.strCategory}</strong>
              <button>Add cart</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default PostItem
